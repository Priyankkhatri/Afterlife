from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None


class UserCreate(UserBase):
    password: str = Field(min_length=6)


class UserInDB(UserBase):
    id: Optional[str] = None
    password_hash: str


class UserOut(UserBase):
    id: Optional[str] = None
