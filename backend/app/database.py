"""
MongoDB connection management using Motor (the async MongoDB driver).

The same MONGODB_URI env var works for local MongoDB and Atlas —
nothing here needs to change between environments.
"""

from motor.motor_asyncio import AsyncIOMotorClient

from app.config import settings


class Database:
    client: AsyncIOMotorClient = None
    db = None


database = Database()


async def connect_to_mongo():
    database.client = AsyncIOMotorClient(settings.MONGODB_URI)
    database.db = database.client[settings.MONGODB_DB_NAME]

    # Helpful indexes — created once at startup, safe to run every time.
    await database.db.users.create_index("email", unique=True)
    await database.db.platform_connections.create_index([("user_id", 1), ("platform", 1)], unique=True)
    await database.db.videos.create_index("user_id")
    await database.db.scheduled_posts.create_index([("user_id", 1), ("scheduled_time", 1)])

    print(f"Connected to MongoDB database: {settings.MONGODB_DB_NAME}")


async def close_mongo_connection():
    if database.client:
        database.client.close()
        print("MongoDB connection closed")


def get_db():
    """Dependency for routers to grab the active database handle."""
    return database.db
