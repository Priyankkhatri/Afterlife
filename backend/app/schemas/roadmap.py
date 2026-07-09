from pydantic import BaseModel


class RoadmapResponse(BaseModel):
    title: str
    steps: list[str]
