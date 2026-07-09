# type: ignore

import json
import os
import tempfile
from datetime import datetime, timezone
from typing import Any, cast
import contextlib

import httpx
from bson import ObjectId
from fastapi import UploadFile

from app.core.exceptions import APIException
from app.database.database import db  # type: ignore
from app.models.document import DocumentCreate
from app.schemas.document import AnalyzeResponse, DeleteResponse, DocumentListResponse, DocumentSummary, DownloadResponse, FamilyProfile, UploadResponse
from app.services.cloudinary_service import delete_file, upload_file

SUPPORTED_CATEGORIES = [
    "Death Certificate",
    "Insurance",
    "Bank",
    "Property",
    "Investment",
    "Bills",
    "Pension",
]

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_API_URL = os.getenv("GEMINI_API_URL", "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent")


def serialize_document(record: dict[str, Any]) -> dict[str, Any]:
    document_id = str(record.get("_id")) if record.get("_id") else None
    return {
        "id": document_id,
        "title": record.get("title", "Untitled"),
        "file_name": record.get("file_name", "document"),
        "file_url": record.get("file_url", ""),
        "category": record.get("category", "Bills"),
        "created_at": record.get("created_at"),
    }


async def _extract_text_from_file(file_path: str) -> str:
    try:
        ext = os.path.splitext(file_path)[1].lower()
        # PDF extraction (optional dependency)
        if ext == ".pdf":
            try:
                import importlib

                pdf_mod = importlib.import_module("pypdf")
                PdfReader = getattr(pdf_mod, "PdfReader", None)
            except Exception:
                PdfReader = None  # type: ignore

            if PdfReader is not None:
                # treat reader as Any for static checkers
                reader: Any = PdfReader(file_path)  # type: ignore
                pages = [getattr(page, "extract_text", lambda: "")() or "" for page in getattr(reader, "pages", [])]
                return "\n".join(page for page in pages if page).strip()

        # Image OCR (optional dependencies)
        if ext in {".png", ".jpg", ".jpeg", ".webp", ".bmp", ".tif", ".tiff"}:
            try:
                import importlib

                pil_mod = importlib.import_module("PIL.Image")
                pytesseract_mod = importlib.import_module("pytesseract")
                Image = getattr(pil_mod, "Image", None)
                pytesseract = getattr(pytesseract_mod, "image_to_string", None)
            except Exception:
                Image = None  # type: ignore
                pytesseract = None  # type: ignore

            if Image is not None and pytesseract is not None:
                image = Image.open(file_path)  # type: ignore
                return pytesseract(image)  # type: ignore

        with open(file_path, "rb") as handle:
            raw_bytes = handle.read()
        return raw_bytes.decode("utf-8", errors="ignore")
    except Exception:
        return ""


async def _analyze_with_gemini(text: str, category: str) -> dict[str, Any]:
    if not GEMINI_API_KEY:
        return {
            "summary": f"Document uploaded under {category}.",
            "tags": [category.lower()],
            "confidence": 0.75,
            "family_profile": {
                "family_members": [],
                "organizations": [],
                "action_items": ["Review the document and archive it."],
                "priority_score": 2,
                "benefits": [],
                "deadlines": [],
            },
        }

    prompt = f"""
    You are analyzing an estate-planning document.
    Extract all readable text and return structured JSON with:
    - summary: concise summary
    - tags: relevant tags such as banks, insurance companies, policies, investments, government IDs, benefits, subscriptions, bills
    - confidence: number between 0 and 1
    - family_profile: object with family_members, organizations, action_items, priority_score, benefits, deadlines

    Document category: {category}
    Extracted text:
    {text[:12000]}
    """

    payload: dict[str, Any] = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseMimeType": "application/json"},
    }

    async with httpx.AsyncClient(timeout=20.0) as client:
        response: httpx.Response = await client.post(
            f"{GEMINI_API_URL}?key={GEMINI_API_KEY}",
            json=payload,
        )
        response.raise_for_status()
        data = response.json()
        if not isinstance(data, dict):
            data = {}

    # Safely extract the text response from the Gemini-style payload
    text_response = "{}"
    candidates = data.get("candidates")
    if isinstance(candidates, list) and len(candidates) > 0:
        first = candidates[0]
        if isinstance(first, dict):
            content = first.get("content")
            if isinstance(content, dict):
                parts = content.get("parts")
                if isinstance(parts, list) and len(parts) > 0 and isinstance(parts[0], dict):
                    text_response = parts[0].get("text", "{}")

    try:
        parsed = json.loads(text_response)
    except Exception:
        parsed = {}
    if not isinstance(parsed, dict):
        parsed = {}

    return {
        "summary": parsed.get("summary") or f"Document uploaded under {category}.",
        "tags": parsed.get("tags") or [category.lower()],
        "confidence": parsed.get("confidence") or 0.75,
        "family_profile": parsed.get("family_profile") or {
            "family_members": [],
            "organizations": [],
            "action_items": ["Review the document and archive it."],
            "priority_score": 2,
            "benefits": [],
            "deadlines": [],
        },
    }


async def upload_document(user_id: str, file: UploadFile, category: str) -> UploadResponse:
    if not file.filename:
        raise APIException(status_code=400, detail="File name is required")
    if category not in SUPPORTED_CATEGORIES:
        raise APIException(status_code=400, detail="Unsupported document category")

    with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1] or ".bin") as temp_file:
        content = await file.read()
        temp_file.write(content)
        temp_path = temp_file.name

    try:
        upload_result = upload_file(temp_path)
        extracted_text = await _extract_text_from_file(temp_path)
        analysis = await _analyze_with_gemini(extracted_text, category)
    except Exception as exc:
        raise APIException(status_code=500, detail="Unable to upload file to Cloudinary") from exc
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

    doc_data = DocumentCreate(
        title=file.filename,
        description="Uploaded document",
        file_url=upload_result.get("secure_url", ""),
        category=category,
        file_name=file.filename,
        public_id=upload_result.get("public_id"),
    )
    inserted = await db["documents"].insert_one({  # type: ignore
        **doc_data.model_dump(),
        "user_id": user_id,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "analysis": {
            "summary": analysis["summary"],
            "tags": analysis["tags"],
            "confidence": analysis["confidence"],
            "extracted_text": extracted_text,
            "family_profile": analysis["family_profile"],
        },
    })

    return UploadResponse(
        id=str(inserted.inserted_id),
        file_name=file.filename,
        file_url=doc_data.file_url,
        category=category,
        summary=analysis["summary"],
        tags=analysis["tags"],
        confidence=analysis["confidence"],
        family_profile=analysis["family_profile"],
        message="Uploaded successfully",
    )


async def list_documents(user_id: str) -> DocumentListResponse:
    records = await db["documents"].find({"user_id": user_id}).sort("created_at", -1).to_list(length=100)  # type: ignore
    records_list = cast(list[dict[str, Any]], records)
    documents = [DocumentSummary(**serialize_document(record)) for record in records_list]
    return DocumentListResponse(documents=documents)


async def delete_document(user_id: str, document_id: str) -> DeleteResponse:
    record = await db["documents"].find_one({"_id": ObjectId(document_id), "user_id": user_id})  # type: ignore
    if not record:
        raise APIException(status_code=404, detail="Document not found")

    # remove remote file if it exists (suppress errors from the cloud provider)
    rec = cast(dict[str, Any], record)
    if (public_id := rec.get("public_id")):
        with contextlib.suppress(Exception):
            delete_file(public_id)

    await db["documents"].delete_one({"_id": ObjectId(document_id), "user_id": user_id})  # type: ignore
    return DeleteResponse(message="Document deleted")


async def get_document_download(user_id: str, document_id: str) -> DownloadResponse:
    record = await db["documents"].find_one({"_id": ObjectId(document_id), "user_id": user_id})  # type: ignore
    if not record:
        raise APIException(status_code=404, detail="Document not found")
    rec = cast(dict[str, Any], record)
    return DownloadResponse(file_url=rec.get("file_url", ""))


async def analyze_document(user_id: str, document_id: str | None, note: str | None) -> dict[str, Any]:
    if not document_id:
        return {
            "summary": "No document selected.",
            "tags": ["estate"],
            "confidence": 0.0,
            "extracted_text": None,
            "family_profile": {
                "family_members": [],
                "organizations": [],
                "action_items": [],
                "priority_score": 0,
                "benefits": [],
                "deadlines": [],
            },
        }

    record = await db["documents"].find_one({"_id": ObjectId(document_id), "user_id": user_id})
    if not record:
        raise APIException(status_code=404, detail="Document not found")

    analysis = record.get("analysis") or {}
    return {
        "document_id": str(record.get("_id")),
        "summary": analysis.get("summary") or f"Analysis for {document_id}.",
        "tags": analysis.get("tags") or ["estate"],
        "confidence": analysis.get("confidence") or 0.0,
        "extracted_text": analysis.get("extracted_text"),
        "family_profile": analysis.get("family_profile") or {
            "family_members": [],
            "organizations": [],
            "action_items": [],
            "priority_score": 0,
            "benefits": [],
            "deadlines": [],
        },
    }
