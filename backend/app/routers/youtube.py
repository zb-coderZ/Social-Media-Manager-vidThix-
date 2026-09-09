from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import RedirectResponse
from jose import jwt

from app.config import settings
from app.database import get_db
from app.services import youtube_service
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/api/auth/youtube", tags=["youtube"])


@router.get("/connect")
async def connect_youtube(user=Depends(get_current_user)):
    """
    Returns the Google consent URL for the frontend to redirect the browser to.
    The user's id is embedded in a short-lived signed `state` token so the
    callback (which Google calls directly, with no Authorization header)
    knows which account to attach the connection to.
    """
    state = jwt.encode(
        {
            "sub": str(user["_id"]),
            "exp": datetime.now(timezone.utc) + timedelta(minutes=10),
        },
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )
    auth_url = youtube_service.build_authorization_url(state=state)
    return {"authorization_url": auth_url}


@router.get("/callback")
async def youtube_callback(code: str = Query(...), state: str = Query(...), db=Depends(get_db)):
    try:
        state_data = jwt.decode(state, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid or expired state token")

    from bson import ObjectId

    user_id = ObjectId(state_data["sub"])
    tokens = youtube_service.exchange_code_for_tokens(code)
    channel = youtube_service.get_channel_info(tokens["access_token"])

    await db.platform_connections.update_one(
        {"user_id": user_id, "platform": "youtube"},
        {
            "$set": {
                "user_id": user_id,
                "platform": "youtube",
                "status": "connected",
                "access_token": tokens["access_token"],
                "refresh_token": tokens["refresh_token"],
                "expires_at": tokens["expires_at"],
                "account_name": channel.get("channel_title"),
                "account_avatar": channel.get("thumbnail"),
                "external_account_id": channel.get("channel_id"),
                "connected_at": datetime.now(timezone.utc),
            }
        },
        upsert=True,
    )

    # Send the user back to the frontend platforms page with a success flag.
    return RedirectResponse(url=f"{settings.FRONTEND_ORIGIN}/platforms?connected=youtube")
