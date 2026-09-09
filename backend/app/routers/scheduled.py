from datetime import datetime, timezone

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException

from app.database import get_db
from app.schemas.scheduled_post import ScheduledPostOut
from app.schemas.video import ScheduleRequest
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/api/scheduled", tags=["scheduled"])


@router.post("/{video_id}", response_model=ScheduledPostOut, status_code=201)
async def schedule_video(
    video_id: str,
    payload: ScheduleRequest,
    user=Depends(get_current_user),
    db=Depends(get_db),
):
    if not ObjectId.is_valid(video_id):
        raise HTTPException(status_code=400, detail="Invalid video id")

    video = await db.videos.find_one({"_id": ObjectId(video_id), "user_id": user["_id"]})
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")

    connection = await db.platform_connections.find_one(
        {"user_id": user["_id"], "platform": payload.platform}
    )
    if not connection:
        raise HTTPException(status_code=400, detail=f"{payload.platform} is not connected")

    if payload.scheduled_time <= datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="scheduled_time must be in the future")

    post_doc = {
        "user_id": user["_id"],
        "video_id": video["_id"],
        "platform": payload.platform,
        "scheduled_time": payload.scheduled_time,
        "privacy_status": payload.privacy_status,
        "status": "pending",
        "created_at": datetime.now(timezone.utc),
    }
    result = await db.scheduled_posts.insert_one(post_doc)
    post_doc["_id"] = result.inserted_id

    await db.videos.update_one({"_id": video["_id"]}, {"$set": {"status": "scheduled"}})
    return post_doc


@router.get("", response_model=list[ScheduledPostOut])
async def list_scheduled(user=Depends(get_current_user), db=Depends(get_db)):
    return (
        await db.scheduled_posts.find({"user_id": user["_id"]})
        .sort("scheduled_time", 1)
        .to_list(200)
    )


@router.delete("/{post_id}")
async def cancel_scheduled(post_id: str, user=Depends(get_current_user), db=Depends(get_db)):
    if not ObjectId.is_valid(post_id):
        raise HTTPException(status_code=400, detail="Invalid post id")

    result = await db.scheduled_posts.update_one(
        {"_id": ObjectId(post_id), "user_id": user["_id"], "status": "pending"},
        {"$set": {"status": "cancelled"}},
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Pending scheduled post not found")
    return {"detail": "Scheduled post cancelled"}
