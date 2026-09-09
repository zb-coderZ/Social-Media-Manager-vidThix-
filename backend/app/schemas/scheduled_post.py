from datetime import datetime
from enum import Enum

from pydantic import BaseModel, Field

from app.utils.object_id import PyObjectId


class ScheduledPostStatus(str, Enum):
    pending = "pending"
    processing = "processing"
    completed = "completed"
    failed = "failed"
    cancelled = "cancelled"


class ScheduledPostOut(BaseModel):
    id: PyObjectId = Field(alias="_id")
    user_id: PyObjectId
    video_id: PyObjectId
    platform: str
    scheduled_time: datetime
    privacy_status: str
    status: ScheduledPostStatus
    created_at: datetime

    class Config:
        populate_by_name = True


class DashboardStats(BaseModel):
    total_uploads: int
    total_published: int
    total_scheduled: int
    connected_platforms: int
    recent_activity: list[dict]
