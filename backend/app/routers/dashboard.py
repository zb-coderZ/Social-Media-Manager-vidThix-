from fastapi import APIRouter, Depends

from app.database import get_db
from app.schemas.scheduled_post import DashboardStats
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get("/stats", response_model=DashboardStats)
async def get_dashboard_stats(user=Depends(get_current_user), db=Depends(get_db)):
    uid = user["_id"]

    total_uploads = await db.videos.count_documents({"user_id": uid})
    total_published = await db.videos.count_documents({"user_id": uid, "status": "published"})
    total_scheduled = await db.scheduled_posts.count_documents({"user_id": uid, "status": "pending"})
    connected_platforms = await db.platform_connections.count_documents(
        {"user_id": uid, "status": "connected"}
    )

    recent_videos = (
        await db.videos.find({"user_id": uid}).sort("created_at", -1).to_list(10)
    )
    recent_activity = [
        {
            "video_id": str(v["_id"]),
            "title": v["title"],
            "status": v["status"],
            "created_at": v["created_at"].isoformat(),
        }
        for v in recent_videos
    ]

    return DashboardStats(
        total_uploads=total_uploads,
        total_published=total_published,
        total_scheduled=total_scheduled,
        connected_platforms=connected_platforms,
        recent_activity=recent_activity,
    )
