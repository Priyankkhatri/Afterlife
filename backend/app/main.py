from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError

from app.core.handlers import api_exception_handler, unhandled_exception_handler, validation_exception_handler
from app.core.exceptions import APIException
from app.database.database import connect_db
from app.routers import auth, chat, dashboard, documents, letters, tasks

app = FastAPI(title="Afterlife API")


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}

app.add_exception_handler(APIException, api_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(Exception, unhandled_exception_handler)

app.include_router(auth.router)
app.include_router(documents.router)
app.include_router(dashboard.router)
app.include_router(tasks.router)
app.include_router(letters.router)
app.include_router(chat.router)


@app.on_event("startup")
async def startup_event() -> None:
    await connect_db()
