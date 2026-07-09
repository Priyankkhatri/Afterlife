from pydantic import BaseModel, Field


class LetterRequest(BaseModel):
    topic: str = Field(min_length=1)


class LetterResponse(BaseModel):
    subject: str
    body: str
