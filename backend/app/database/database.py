from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import DATABASE_NAME, MONGODB_URI

client = AsyncIOMotorClient(MONGODB_URI, serverSelectionTimeoutMS=1000)
db = client[DATABASE_NAME]


async def connect_db() -> None:
    try:
        await client.admin.command("ping")
    except Exception:
        pass
