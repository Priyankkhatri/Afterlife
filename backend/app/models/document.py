from typing import Optional
from pydantic import BaseModel, Field


class DocumentBase(BaseModel):
    title: str = Field(min_length=1)
    description: Optional[str] = None
    file_url: str
    category: str
    file_name: str
    public_id: str | None = None


class DocumentCreate(DocumentBase):
    pass


class DocumentOut(DocumentBase):
    id: Optional[str] = None
    user_id: str
