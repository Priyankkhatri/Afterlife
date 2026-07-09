import json
import os
import tempfile
from typing import Any

import httpx
from fastapi.responses import StreamingResponse
from reportlab.lib.pagesizes import letter as letter_size
from reportlab.pdfgen.canvas import Canvas

from app.core.exceptions import APIException

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_API_URL = os.getenv(
    "GEMINI_API_URL",
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
)


async def generate_letter(topic: str) -> dict[str, str]:
    if not topic.strip():
        raise APIException(status_code=400, detail="Topic is required")

    prompt = (
        "Write a professional letter or email based on the following topic. "
        "Include a clear subject line and a polished body. "
        f"Topic: {topic}."
    )

    text = await _call_gemini(prompt)
    subject, body = _extract_subject_body(text)

    return {"subject": subject, "body": body}


async def generate_letter_pdf(topic: str) -> bytes:
    text = await _call_gemini(
        "Write a polished PDF-ready letter with subject and content. "
        f"Topic: {topic}."
    )

    subject, body = _extract_subject_body(text)
    return _create_pdf(subject, body)


async def _call_gemini(prompt: str) -> str:
    if not GEMINI_API_KEY:
        return (
            "Subject: AI Letter Draft\n\n"
            "This is a generated letter draft for the requested topic. "
            "Please edit it to match your specific needs."
        )

    payload = {
        "prompt": {"text": prompt},
        "temperature": 0.7,
        "maxOutputTokens": 512,
    }

    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.post(
            f"{GEMINI_API_URL}?key={GEMINI_API_KEY}",
            json=payload,
            headers={"Content-Type": "application/json"},
        )
        response.raise_for_status()
        result = response.json()

    candidates = result.get("candidates") or []
    if candidates:
        first = candidates[0]
        if isinstance(first, dict):
            content = first.get("content")
            if isinstance(content, list):
                texts = [item.get("text", "") for item in content if isinstance(item, dict)]
                return "\n".join(texts).strip()
            return str(content)
        return str(first)

    return str(result)


def _extract_subject_body(text: str) -> tuple[str, str]:
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    if not lines:
        return ("Generated Letter", "")

    subject = "Generated Letter"
    body_lines: list[str] = []

    for line in lines:
        if line.lower().startswith("subject:"):
            subject = line.split(":", 1)[1].strip() or subject
        else:
            body_lines.append(line)

    if not body_lines:
        body_lines = lines[1:]

    return subject, "\n\n".join(body_lines).strip()


def _create_pdf(subject: str, body: str) -> bytes:
    with tempfile.NamedTemporaryFile(suffix='.pdf', delete=False) as tmp:
        canvas = Canvas(tmp.name, pagesize=letter_size)
        text_object = canvas.beginText(40, 740)
        text_object.setFont("Helvetica-Bold", 14)
        text_object.textLine(subject)
        text_object.setFont("Helvetica", 12)
        text_object.textLine("")
        for paragraph in body.split("\n\n"):
            for line in paragraph.splitlines():
                text_object.textLine(line)
            text_object.textLine("")
        canvas.drawText(text_object)
        canvas.showPage()
        canvas.save()
        tmp_path = tmp.name

    with open(tmp_path, "rb") as pdf_file:
        return pdf_file.read()
