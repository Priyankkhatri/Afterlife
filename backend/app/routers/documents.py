from fastapi import APIRouter, Depends, File, Form, UploadFile, status
from app.middleware.auth import get_current_user
from app.schemas.document import AnalyzeRequest, AnalyzeResponse, DeleteResponse, DocumentListResponse, DownloadResponse, UploadResponse
from app.services.document_service import analyze_document, delete_document, get_document_download, list_documents, upload_document

router = APIRouter(prefix="/documents", tags=["documents"])


@router.post("/upload", response_model=UploadResponse, status_code=status.HTTP_201_CREATED)
async def upload(
    current_user: dict = Depends(get_current_user),
    file: UploadFile = File(...),
    category: str = Form(...),
) -> UploadResponse:
    return await upload_document(current_user["sub"], file, category)


@router.get("/", response_model=DocumentListResponse)
async def list_user_documents(current_user: dict = Depends(get_current_user)) -> DocumentListResponse:
    return await list_documents(current_user["sub"])


@router.delete("/{document_id}", response_model=DeleteResponse)
async def delete_user_document(document_id: str, current_user: dict = Depends(get_current_user)) -> DeleteResponse:
    return await delete_document(current_user["sub"], document_id)


@router.get("/{document_id}/download", response_model=DownloadResponse)
async def download_user_document(document_id: str, current_user: dict = Depends(get_current_user)) -> DownloadResponse:
    return await get_document_download(current_user["sub"], document_id)


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze(payload: AnalyzeRequest, current_user: dict = Depends(get_current_user)) -> AnalyzeResponse:
    result = await analyze_document(current_user["sub"], payload.document_id, payload.note)
    return AnalyzeResponse(**result)
