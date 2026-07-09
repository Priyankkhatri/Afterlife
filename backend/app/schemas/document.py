from pydantic import BaseModel, Field


class UploadResponse(BaseModel):
    id: str | None = None
    file_name: str
    file_url: str
    category: str
    summary: str | None = None
    tags: list[str] = Field(default_factory=list)
    confidence: float | None = None
    family_profile: dict | None = None
    message: str


class DocumentSummary(BaseModel):
    id: str
    title: str
    file_name: str
    file_url: str
    category: str
    created_at: str | None = None


class DocumentListResponse(BaseModel):
    documents: list[DocumentSummary]


class DeleteResponse(BaseModel):
    message: str


class DownloadResponse(BaseModel):
    file_url: str


class AnalyzeRequest(BaseModel):
    document_id: str | None = None
    note: str | None = None


class FamilyProfile(BaseModel):
    family_members: list[str] = Field(default_factory=list)
    organizations: list[str] = Field(default_factory=list)
    action_items: list[str] = Field(default_factory=list)
    priority_score: int = 0
    benefits: list[str] = Field(default_factory=list)
    deadlines: list[str] = Field(default_factory=list)


class AnalyzeResponse(BaseModel):
    document_id: str | None = None
    summary: str
    tags: list[str]
    confidence: float
    extracted_text: str | None = None
    family_profile: FamilyProfile | None = None
