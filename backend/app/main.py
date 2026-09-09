from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import close_mongo_connection, connect_to_mongo
from app.routers import auth, dashboard, platforms, scheduled, videos, youtube
from app.services.scheduler_service import start_scheduler, stop_scheduler


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await connect_to_mongo()
    start_scheduler()
    yield
    # Shutdown
    stop_scheduler()
    await close_mongo_connection()


app = FastAPI(
    title=settings.APP_NAME,
    description="Backend API for vidThix — upload, connect, publish, and schedule video content.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(youtube.router)
app.include_router(platforms.router)
app.include_router(videos.router)
app.include_router(scheduled.router)
app.include_router(dashboard.router)


@app.get("/")
async def root():
    return {"name": settings.APP_NAME, "status": "running", "docs": "/docs"}


@app.get("/health")
async def health_check():
    return {"status": "ok"}
