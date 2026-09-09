from datetime import datetime
from enum import Enum

from pydantic import BaseModel, Field

from app.utils.object_id import PyObjectId


class PlatformName(str, Enum):
    youtube = "youtube"
    instagram = "instagram"
    tiktok = "tiktok"
    linkedin = "linkedin"
    facebook = "facebook"


class PlatformStatus(str, Enum):
    connected = "connected"
    disconnected = "disconnected"
    coming_soon = "coming_soon"


class PlatformConnectionOut(BaseModel):
    id: PyObjectId = Field(alias="_id")
    platform: PlatformName
    status: PlatformStatus
    account_name: str | None = None
    account_avatar: str | None = None
    connected_at: datetime | None = None

    class Config:
        populate_by_name = True
