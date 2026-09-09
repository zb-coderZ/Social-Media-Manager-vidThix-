"""
Everything YouTube-specific: building the OAuth consent URL, exchanging the
auth code for tokens, refreshing expired tokens, and publishing a video via
the YouTube Data API's resumable upload.

Keeping this isolated means adding another platform later (TikTok, LinkedIn)
means writing a sibling service file, not touching this one.
"""

from datetime import datetime, timedelta, timezone

from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
import google.auth.transport.requests

from app.config import settings

CLIENT_CONFIG = {
    "web": {
        "client_id": settings.GOOGLE_CLIENT_ID,
        "client_secret": settings.GOOGLE_CLIENT_SECRET,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "redirect_uris": [settings.GOOGLE_REDIRECT_URI],
    }
}


def build_authorization_url(state: str) -> str:
    flow = Flow.from_client_config(
        CLIENT_CONFIG, scopes=settings.YOUTUBE_SCOPES, state=state
    )
    flow.redirect_uri = settings.GOOGLE_REDIRECT_URI
    auth_url, _ = flow.authorization_url(
        access_type="offline",       # required to get a refresh_token
        include_granted_scopes="true",
        prompt="consent",            # forces refresh_token on every connect
        state=state,
    )
    return auth_url


def exchange_code_for_tokens(code: str) -> dict:
    flow = Flow.from_client_config(
        CLIENT_CONFIG, scopes=settings.YOUTUBE_SCOPES
    )
    flow.redirect_uri = settings.GOOGLE_REDIRECT_URI
    flow.fetch_token(code=code)
    creds = flow.credentials
    return {
        "access_token": creds.token,
        "refresh_token": creds.refresh_token,
        "expires_at": creds.expiry,
        "scopes": creds.scopes,
    }


def get_channel_info(access_token: str) -> dict:
    creds = Credentials(token=access_token)
    youtube = build("youtube", "v3", credentials=creds)
    response = youtube.channels().list(part="snippet,statistics", mine=True).execute()
    if not response.get("items"):
        return {}
    channel = response["items"][0]
    return {
        "channel_id": channel["id"],
        "channel_title": channel["snippet"]["title"],
        "thumbnail": channel["snippet"]["thumbnails"]["default"]["url"],
        "subscriber_count": channel["statistics"].get("subscriberCount"),
    }


def refresh_access_token(refresh_token: str) -> dict:
    creds = Credentials(
        token=None,
        refresh_token=refresh_token,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=settings.GOOGLE_CLIENT_ID,
        client_secret=settings.GOOGLE_CLIENT_SECRET,
    )
    creds.refresh(google.auth.transport.requests.Request())
    return {
        "access_token": creds.token,
        "expires_at": creds.expiry,
    }


def upload_video(
    access_token: str,
    file_path: str,
    title: str,
    description: str,
    tags: list[str],
    category: str,
    privacy_status: str = "private",
) -> dict:
    """Uploads a video file to YouTube and returns the resulting video id/url."""
    creds = Credentials(token=access_token)
    youtube = build("youtube", "v3", credentials=creds)

    body = {
        "snippet": {
            "title": title,
            "description": description,
            "tags": tags,
            "categoryId": "22",  # People & Blogs fallback; map `category` -> real IDs as needed
        },
        "status": {"privacyStatus": privacy_status},
    }

    media = MediaFileUpload(file_path, chunksize=-1, resumable=True, mimetype="video/*")
    request = youtube.videos().insert(part="snippet,status", body=body, media_body=media)

    response = None
    while response is None:
        status_, response = request.next_chunk()

    video_id = response["id"]
    return {
        "external_video_id": video_id,
        "external_url": f"https://www.youtube.com/watch?v={video_id}",
    }


def is_token_expired(expires_at: datetime | None) -> bool:
    if not expires_at:
        return True
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    return datetime.now(timezone.utc) >= expires_at - timedelta(minutes=2)
