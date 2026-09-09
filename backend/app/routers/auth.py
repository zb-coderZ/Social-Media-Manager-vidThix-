from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status

from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)
from app.database import get_db
from app.schemas.user import RefreshRequest, TokenResponse, UserCreate, UserLogin, UserOut
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(payload: UserCreate, db=Depends(get_db)):
    existing = await db.users.find_one({"email": payload.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_doc = {
        "name": payload.name,
        "email": payload.email,
        "password_hash": hash_password(payload.password),
        "is_admin": False,
        "created_at": datetime.now(timezone.utc),
    }
    result = await db.users.insert_one(user_doc)
    user_doc["_id"] = result.inserted_id

    return _build_token_response(user_doc)


@router.post("/login", response_model=TokenResponse)
async def login(payload: UserLogin, db=Depends(get_db)):
    user = await db.users.find_one({"email": payload.email})
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return _build_token_response(user)


@router.post("/refresh", response_model=TokenResponse)
async def refresh(payload: RefreshRequest, db=Depends(get_db)):
    data = decode_token(payload.refresh_token)
    if not data or data.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    from bson import ObjectId

    user = await db.users.find_one({"_id": ObjectId(data["sub"])})
    if not user:
        raise HTTPException(status_code=401, detail="User no longer exists")

    return _build_token_response(user)


@router.get("/me", response_model=UserOut)
async def me(user=Depends(get_current_user)):
    return user


def _build_token_response(user: dict) -> TokenResponse:
    token_data = {"sub": str(user["_id"])}
    return TokenResponse(
        access_token=create_access_token(token_data),
        refresh_token=create_refresh_token(token_data),
        user=UserOut(**user),
    )
