from pydantic import BaseModel, Field


class TaskCreateRequest(BaseModel):
    title: str = Field(min_length=1)
    description: str | None = None


class TaskResponse(BaseModel):
    id: str
    title: str
    description: str | None = None
    completed: bool = False
