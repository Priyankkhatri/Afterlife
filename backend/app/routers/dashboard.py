from fastapi import APIRouter, Depends
from app.middleware.auth import get_current_user
from app.schemas.benefit import BenefitResponse
from app.schemas.roadmap import RoadmapResponse

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("")
async def dashboard(current_user: dict = Depends(get_current_user)) -> dict:
    return {
        "roadmap": RoadmapResponse(title="Estate Planning", steps=["Gather documents", "Review beneficiaries", "Create will"]).model_dump(),
        "benefits": [
            BenefitResponse(title="Secure Legacy", description="Protect your wishes").model_dump(),
            BenefitResponse(title="Reduce Stress", description="Make decisions easier for loved ones").model_dump(),
        ],
    }
