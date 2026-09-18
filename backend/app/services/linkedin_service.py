"""
LinkedIn-specific service: building the OAuth consent URL, exchanging the auth code for tokens,
fetching user profile info via OpenID Connect, and publishing text posts via the LinkedIn UGC API.
"""

from datetime import datetime, timedelta, timezone
import json
import urllib.parse
import urllib.request

from app.config import settings


def build_authorization_url(state: str) -> str:
    """Builds the LinkedIn OAuth 2.0 authorization URL."""
    scopes = settings.LINKEDIN_SCOPES.replace(",", " ")
    params = {
        "response_type": "code",
        "client_id": settings.LINKEDIN_CLIENT_ID,
        "redirect_uri": settings.LINKEDIN_REDIRECT_URI,
        "state": state,
        "scope": scopes,
    }
    return f"https://www.linkedin.com/oauth/v2/authorization?{urllib.parse.urlencode(params)}"


def exchange_code_for_tokens(code: str) -> dict:
    """Exchanges authorization code for LinkedIn access token."""
    url = "https://www.linkedin.com/oauth/v2/accessToken"
    payload = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": settings.LINKEDIN_REDIRECT_URI,
        "client_id": settings.LINKEDIN_CLIENT_ID,
        "client_secret": settings.LINKEDIN_CLIENT_SECRET,
    }
    data = urllib.parse.urlencode(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    with urllib.request.urlopen(req) as response:
        res_data = json.loads(response.read().decode("utf-8"))

    expires_in = res_data.get("expires_in", 5184000)  # Default 60 days
    expires_at = datetime.now(timezone.utc) + timedelta(seconds=expires_in)

    return {
        "access_token": res_data.get("access_token"),
        "expires_at": expires_at,
        "scopes": res_data.get("scope", settings.LINKEDIN_SCOPES),
    }


def get_profile_info(access_token: str) -> dict:
    """Fetches LinkedIn user profile info using OpenID Connect userinfo endpoint."""
    url = "https://api.linkedin.com/v2/userinfo"
    req = urllib.request.Request(
        url,
        headers={"Authorization": f"Bearer {access_token}"},
    )
    with urllib.request.urlopen(req) as response:
        res_data = json.loads(response.read().decode("utf-8"))

    sub = res_data.get("sub", "")
    return {
        "profile_id": sub,
        "name": res_data.get("name", ""),
        "avatar": res_data.get("picture", ""),
        "urn": f"urn:li:person:{sub}" if sub else "",
    }


def publish_text_post(access_token: str, content: str, author_urn: str = None) -> dict:
    """Publishes a text post to LinkedIn member feed."""
    if not author_urn:
        profile = get_profile_info(access_token)
        author_urn = profile.get("urn")

    url = "https://api.linkedin.com/v2/ugcPosts"
    payload = {
        "author": author_urn,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {"text": content},
                "shareMediaCategory": "NONE",
            }
        },
        "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        },
    }

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Authorization": f"Bearer {access_token}",
            "X-Restli-Protocol-Version": "2.0.0",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req) as response:
        res_data = json.loads(response.read().decode("utf-8"))

    post_id = res_data.get("id", "")
    return {
        "external_post_id": post_id,
        "external_url": f"https://www.linkedin.com/feed/update/{post_id}",
    }


def is_token_expired(expires_at: datetime | None) -> bool:
    """Checks if the LinkedIn token is expired or within 2 minutes of expiration."""
    if not expires_at:
        return True
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    return datetime.now(timezone.utc) >= expires_at - timedelta(minutes=2)
