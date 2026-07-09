from fastapi import status
from app.core.config import DATABASE_NAME
from app.core.exceptions import APIException
from app.core.security import create_access_token, hash_password, verify_password
from app.database.database import db
from app.models.user import UserCreate, UserInDB, UserOut


async def signup_user(payload: UserCreate) -> tuple[str, UserOut]:
    existing = await db["users"].find_one({"email": payload.email})
    if existing:
        raise APIException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

    user_data = UserInDB(
        email=payload.email,
        full_name=payload.full_name,
        password_hash=hash_password(payload.password),
    )
    result = await db["users"].insert_one(user_data.model_dump(exclude={"id"}))
    user_id = str(result.inserted_id)
    token = create_access_token(user_id)
    return token, UserOut(id=user_id, email=payload.email, full_name=payload.full_name)


async def login_user(email: str, password: str) -> tuple[str, UserOut]:
    user_doc = await db["users"].find_one({"email": email})
    if not user_doc:
        raise APIException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    user = UserInDB(**user_doc)
    if not verify_password(password, user.password_hash):
        raise APIException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token(str(user_doc["_id"]))
    return token, UserOut(id=str(user_doc["_id"]), email=user.email, full_name=user.full_name)


async def get_user_profile(user_id: str) -> UserOut:
    user_doc = await db["users"].find_one({"_id": user_id})
    if not user_doc:
        raise APIException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return UserOut(id=str(user_doc["_id"]), email=user_doc["email"], full_name=user_doc.get("full_name"))
