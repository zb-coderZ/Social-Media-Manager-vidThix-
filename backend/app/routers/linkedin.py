from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import RedirectResponse
from jose import jwt

from app.config import settings
from app.database import get_db
from app.services import linkedin_service
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/api/auth/linkedin", tags=["linkedin"])


@router.get("/connect")
async def connect_linkedin(user=Depends(get_current_user)):
    """
    Returns the LinkedIn consent URL for the frontend to redirect the browser to.
    The user's id is embedded in a short-lived signed `state` token so the
    callback (which LinkedIn calls directly, with no Authorization header)
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
    auth_url = linkedin_service.build_authorization_url(state=state)
    return {"authorization_url": auth_url}


@router.get("/callback")
async def linkedin_callback(code: str = Query(...), state: str = Query(...), db=Depends(get_db)):
    try:
        state_data = jwt.decode(state, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid or expired state token")

    from bson import ObjectId

    user_id = ObjectId(state_data["sub"])
    tokens = linkedin_service.exchange_code_for_tokens(code)
    profile = linkedin_service.get_profile_info(tokens["access_token"])

    await db.platform_connections.update_one(
        {"user_id": user_id, "platform": "linkedin"},
        {
            "$set": {
                "user_id": user_id,
                "platform": "linkedin",
                "status": "connected",
                "access_token": tokens["access_token"],
                "expires_at": tokens.get("expires_at"),
                "account_name": profile.get("name"),
                "account_avatar": profile.get("avatar"),
                "external_account_id": profile.get("urn") or profile.get("profile_id"),
                "connected_at": datetime.now(timezone.utc),
            }
        },
        upsert=True,
    )

    # Send the user back to the frontend platforms page with a success flag.
    return RedirectResponse(url=f"{settings.FRONTEND_ORIGIN}/platforms?connected=linkedin")
