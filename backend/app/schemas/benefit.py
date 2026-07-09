from pydantic import BaseModel


class BenefitResponse(BaseModel):
    title: str
    description: str
