import uuid
from datetime import datetime, timezone
from pathlib import Path

from bson import ObjectId
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile

from app.config import settings
from app.database import get_db
from app.schemas.video import PublishRequest, VideoMetadataUpdate, VideoOut
from app.services import youtube_service
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/api/videos", tags=["videos"])


@router.post("/upload", response_model=VideoOut, status_code=201)
async def upload_video(
    file: UploadFile = File(...),
    user=Depends(get_current_user),
    db=Depends(get_db),
):
    if not file.content_type or not file.content_type.startswith("video/"):
        raise HTTPException(status_code=400, detail="Only video files are accepted")

    ext = Path(file.filename).suffix or ".mp4"
    stored_name = f"{uuid.uuid4().hex}{ext}"
    destination = settings.UPLOAD_DIR / stored_name

    size = 0
    max_bytes = settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024
    with destination.open("wb") as out_file:
        while chunk := await file.read(1024 * 1024):
            size += len(chunk)
            if size > max_bytes:
                out_file.close()
                destination.unlink(missing_ok=True)
                raise HTTPException(
                    status_code=413,
                    detail=f"File exceeds {settings.MAX_UPLOAD_SIZE_MB}MB limit",
                )
            out_file.write(chunk)

    video_doc = {
        "user_id": user["_id"],
        "title": Path(file.filename).stem,
        "description": "",
        "tags": [],
        "category": "Other",
        "file_name": file.filename,
        "file_path": str(destination),
        "file_size": size,
        "status": "ready",
        "platform": None,
        "external_video_id": None,
        "external_url": None,
        "created_at": datetime.now(timezone.utc),
        "published_at": None,
    }
    result = await db.videos.insert_one(video_doc)
    video_doc["_id"] = result.inserted_id
    return video_doc


@router.get("", response_model=list[VideoOut])
async def list_videos(user=Depends(get_current_user), db=Depends(get_db)):
    return await db.videos.find({"user_id": user["_id"]}).sort("created_at", -1).to_list(200)


@router.get("/{video_id}", response_model=VideoOut)
async def get_video(video_id: str, user=Depends(get_current_user), db=Depends(get_db)):
    video = await _get_owned_video(video_id, user, db)
    return video


@router.patch("/{video_id}", response_model=VideoOut)
async def update_metadata(
    video_id: str,
    payload: VideoMetadataUpdate,
    user=Depends(get_current_user),
    db=Depends(get_db),
):
    await _get_owned_video(video_id, user, db)
    await db.videos.update_one({"_id": ObjectId(video_id)}, {"$set": payload.model_dump()})
    return await db.videos.find_one({"_id": ObjectId(video_id)})


@router.post("/{video_id}/publish", response_model=VideoOut)
async def publish_video(
    video_id: str,
    payload: PublishRequest,
    user=Depends(get_current_user),
    db=Depends(get_db),
):
    video = await _get_owned_video(video_id, user, db)
    connection = await db.platform_connections.find_one(
        {"user_id": user["_id"], "platform": payload.platform}
    )
    if not connection:
        raise HTTPException(status_code=400, detail=f"{payload.platform} is not connected")

    access_token = connection["access_token"]
    if youtube_service.is_token_expired(connection.get("expires_at")):
        refreshed = youtube_service.refresh_access_token(connection["refresh_token"])
        access_token = refreshed["access_token"]
        await db.platform_connections.update_one(
            {"_id": connection["_id"]},
            {"$set": {"access_token": access_token, "expires_at": refreshed["expires_at"]}},
        )

    await db.videos.update_one({"_id": video["_id"]}, {"$set": {"status": "publishing"}})

    try:
        result = youtube_service.upload_video(
            access_token=access_token,
            file_path=video["file_path"],
            title=video["title"],
            description=video["description"],
            tags=video.get("tags", []),
            category=video.get("category", "Other"),
            privacy_status=payload.privacy_status,
        )
    except Exception as exc:  # noqa: BLE001
        await db.videos.update_one({"_id": video["_id"]}, {"$set": {"status": "failed"}})
        raise HTTPException(status_code=502, detail=f"Publish failed: {exc}")

    await db.videos.update_one(
        {"_id": video["_id"]},
        {"$set": {
            "status": "published",
            "platform": payload.platform,
            "published_at": datetime.now(timezone.utc),
            **result,
        }},
    )
    return await db.videos.find_one({"_id": video["_id"]})


@router.delete("/{video_id}")
async def delete_video(video_id: str, user=Depends(get_current_user), db=Depends(get_db)):
    video = await _get_owned_video(video_id, user, db)
    Path(video["file_path"]).unlink(missing_ok=True)
    await db.videos.delete_one({"_id": video["_id"]})
    return {"detail": "Video deleted"}


async def _get_owned_video(video_id: str, user: dict, db) -> dict:
    if not ObjectId.is_valid(video_id):
        raise HTTPException(status_code=400, detail="Invalid video id")
    video = await db.videos.find_one({"_id": ObjectId(video_id), "user_id": user["_id"]})
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    return video
