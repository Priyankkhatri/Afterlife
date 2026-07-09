from fastapi import APIRouter, Response, status
from app.schemas.letter import LetterRequest, LetterResponse
from app.services.letter_service import generate_letter, generate_letter_pdf

router = APIRouter(prefix="/generate-letter", tags=["letters"])


@router.post("", response_model=LetterResponse, status_code=status.HTTP_201_CREATED)
async def generate_letter_endpoint(payload: LetterRequest) -> LetterResponse:
    result = await generate_letter(payload.topic)
    return LetterResponse(**result)


@router.get("/pdf", response_class=Response)
async def generate_letter_pdf_endpoint(topic: str):
    pdf_bytes = await generate_letter_pdf(topic)
    return Response(content=pdf_bytes, media_type="application/pdf")
