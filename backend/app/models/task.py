from typing import Optional
from pydantic import BaseModel, Field


class TaskBase(BaseModel):
    title: str = Field(min_length=1)
    description: Optional[str] = None
    completed: bool = False


class TaskCreate(TaskBase):
    pass


class TaskOut(TaskBase):
    id: Optional[str] = None
    user_id: str
