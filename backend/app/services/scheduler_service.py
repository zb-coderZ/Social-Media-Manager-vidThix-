"""
A lightweight background job that polls for scheduled posts whose time has
arrived and publishes them. Uses APScheduler running inside the FastAPI
process — fine for a single-instance deployment. If you ever scale to
multiple backend instances, move this to a dedicated worker (e.g. Celery)
so posts aren't published twice.
"""

from datetime import datetime, timezone

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from bson import ObjectId

from app.database import get_db
from app.services import youtube_service

scheduler = AsyncIOScheduler()


async def process_due_posts():
    db = get_db()
    now = datetime.now(timezone.utc)

    cursor = db.scheduled_posts.find({"status": "pending", "scheduled_time": {"$lte": now}})
    async for post in cursor:
        await db.scheduled_posts.update_one(
            {"_id": post["_id"]}, {"$set": {"status": "processing"}}
        )
        try:
            video = await db.videos.find_one({"_id": post["video_id"]})
            connection = await db.platform_connections.find_one(
                {"user_id": post["user_id"], "platform": post["platform"]}
            )
            if not video or not connection:
                raise ValueError("Missing video or platform connection")

            access_token = connection["access_token"]
            if youtube_service.is_token_expired(connection.get("expires_at")):
                refreshed = youtube_service.refresh_access_token(connection["refresh_token"])
                access_token = refreshed["access_token"]
                await db.platform_connections.update_one(
                    {"_id": connection["_id"]},
                    {"$set": {"access_token": access_token, "expires_at": refreshed["expires_at"]}},
                )

            result = youtube_service.upload_video(
                access_token=access_token,
                file_path=video["file_path"],
                title=video["title"],
                description=video["description"],
                tags=video.get("tags", []),
                category=video.get("category", "Other"),
                privacy_status=post.get("privacy_status", "private"),
            )

            await db.videos.update_one(
                {"_id": video["_id"]},
                {"$set": {
                    "status": "published",
                    "published_at": datetime.now(timezone.utc),
                    **result,
                }},
            )
            await db.scheduled_posts.update_one(
                {"_id": post["_id"]}, {"$set": {"status": "completed"}}
            )
        except Exception as exc:  # noqa: BLE001 — log and mark failed, don't crash the loop
            print(f"[scheduler] Failed to publish scheduled post {post['_id']}: {exc}")
            await db.scheduled_posts.update_one(
                {"_id": post["_id"]}, {"$set": {"status": "failed"}}
            )


def start_scheduler():
    scheduler.add_job(process_due_posts, "interval", minutes=1, id="process_due_posts")
    scheduler.start()


def stop_scheduler():
    scheduler.shutdown(wait=False)
