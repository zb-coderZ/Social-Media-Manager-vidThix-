from fastapi import APIRouter, Depends, HTTPException

from app.database import get_db
from app.schemas.platform import PlatformConnectionOut, PlatformName
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/api/platforms", tags=["platforms"])

# Platforms represented in the UI but not yet wired to a real API.
COMING_SOON = ["instagram", "tiktok", "linkedin", "facebook"]


@router.get("", response_model=list[PlatformConnectionOut])
async def list_platforms(user=Depends(get_current_user), db=Depends(get_db)):
    connections = await db.platform_connections.find({"user_id": user["_id"]}).to_list(100)
    connected_names = {c["platform"] for c in connections}

    # Fill in placeholder entries for platforms the user hasn't connected,
    # so the frontend can render all 5 platform cards consistently.
    for name in [PlatformName.youtube.value, *COMING_SOON]:
        if name not in connected_names:
            connections.append(
                {
                    "_id": f"placeholder-{name}",
                    "platform": name,
                    "status": "coming_soon" if name in COMING_SOON else "disconnected",
                    "account_name": None,
                    "account_avatar": None,
                    "connected_at": None,
                }
            )
    return connections


@router.delete("/{platform}")
async def disconnect_platform(platform: str, user=Depends(get_current_user), db=Depends(get_db)):
    result = await db.platform_connections.delete_one(
        {"user_id": user["_id"], "platform": platform}
    )
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="No connection found for that platform")
    return {"detail": f"{platform} disconnected"}
