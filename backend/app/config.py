"""
Central application configuration.
All values are read from environment variables (.env file in development).
"""

import os
from pathlib import Path

from dotenv import load_dotenv

# Load .env file if present (does nothing in production if you set real env vars)
load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent


class Settings:
    # --- App ---
    APP_NAME: str = "vidThix API"
    ENV: str = os.getenv("ENV", "development")
    DEBUG: bool = ENV != "production"

    # --- Security / JWT ---
    SECRET_KEY: str = os.getenv("SECRET_KEY", "CHANGE_ME_IN_PRODUCTION")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))
    REFRESH_TOKEN_EXPIRE_DAYS: int = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "7"))

    # --- Database ---
    # For local MongoDB (via docker-compose):   mongodb://localhost:27017
    # For MongoDB Atlas:                        mongodb+srv://<user>:<pass>@<cluster>.mongodb.net
    MONGODB_URI: str = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    MONGODB_DB_NAME: str = os.getenv("MONGODB_DB_NAME", "vidthix")

    # --- CORS ---
    FRONTEND_ORIGIN: str = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

    # --- Google / YouTube OAuth ---
    GOOGLE_CLIENT_ID: str = os.getenv("GOOGLE_CLIENT_ID", "")
    GOOGLE_CLIENT_SECRET: str = os.getenv("GOOGLE_CLIENT_SECRET", "")
    GOOGLE_REDIRECT_URI: str = os.getenv(
        "GOOGLE_REDIRECT_URI", "http://localhost:8000/api/auth/youtube/callback"
    )
    YOUTUBE_SCOPES: list = [
        "https://www.googleapis.com/auth/youtube.upload",
        "https://www.googleapis.com/auth/youtube.readonly",
        "openid",
        "https://www.googleapis.com/auth/userinfo.email",
    ]

    # --- File storage ---
    # Local disk for the prototype. Swap for S3 / GCS / R2 later without
    # touching the routers — only upload_service.py needs to change.
    UPLOAD_DIR: Path = BASE_DIR / "app" / "uploads"
    MAX_UPLOAD_SIZE_MB: int = int(os.getenv("MAX_UPLOAD_SIZE_MB", "500"))


settings = Settings()
settings.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
