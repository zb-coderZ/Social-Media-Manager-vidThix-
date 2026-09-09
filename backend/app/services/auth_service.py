"""
Dependency-injected helpers for pulling the current user out of a JWT,
used by any protected route with `Depends(get_current_user)`.
"""

from bson import ObjectId
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.core.security import decode_token
from app.database import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")


async def get_current_user(token: str = Depends(oauth2_scheme), db=Depends(get_db)):
    credentials_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    payload = decode_token(token)
    if not payload or payload.get("type") != "access":
        raise credentials_error

    user_id = payload.get("sub")
    if not user_id:
        raise credentials_error

    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise credentials_error

    return user


async def get_current_admin(user=Depends(get_current_user)):
    if not user.get("is_admin"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    return user
