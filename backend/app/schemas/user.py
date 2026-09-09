from datetime import datetime

from pydantic import BaseModel, EmailStr, Field

from app.utils.object_id import PyObjectId


class UserCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=80)
    email: EmailStr
    password: str = Field(..., min_length=6)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: PyObjectId = Field(alias="_id")
    name: str
    email: EmailStr
    is_admin: bool = False
    created_at: datetime

    class Config:
        populate_by_name = True


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserOut


class RefreshRequest(BaseModel):
    refresh_token: str
