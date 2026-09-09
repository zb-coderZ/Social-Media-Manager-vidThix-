from datetime import datetime
from enum import Enum

from pydantic import BaseModel, Field

from app.utils.object_id import PyObjectId


class VideoStatus(str, Enum):
    draft = "draft"
    uploading = "uploading"
    ready = "ready"
    publishing = "publishing"
    published = "published"
    scheduled = "scheduled"
    failed = "failed"


class VideoMetadataUpdate(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    description: str = Field("", max_length=5000)
    tags: list[str] = []
    category: str = "Other"


class VideoOut(BaseModel):
    id: PyObjectId = Field(alias="_id")
    user_id: PyObjectId
    title: str
    description: str
    tags: list[str]
    category: str
    file_name: str
    file_size: int
    status: VideoStatus
    platform: str | None = None
    external_video_id: str | None = None
    external_url: str | None = None
    created_at: datetime
    published_at: datetime | None = None

    class Config:
        populate_by_name = True


class PublishRequest(BaseModel):
    platform: str = "youtube"
    privacy_status: str = "private"  # private | unlisted | public


class ScheduleRequest(BaseModel):
    platform: str = "youtube"
    scheduled_time: datetime
    privacy_status: str = "private"
