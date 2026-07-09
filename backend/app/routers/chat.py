from fastapi import APIRouter

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("")
async def chat() -> dict:
    return {"message": "Chat endpoint ready."}
