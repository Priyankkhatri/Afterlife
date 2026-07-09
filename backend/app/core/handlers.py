from fastapi import Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.status import HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR

from app.core.exceptions import APIException


async def api_exception_handler(request: Request, exc: APIException) -> JSONResponse:
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})


async def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    return JSONResponse(status_code=HTTP_400_BAD_REQUEST, content={"detail": exc.errors()})


async def http_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    return JSONResponse(status_code=getattr(exc, "status_code", HTTP_400_BAD_REQUEST), content={"detail": str(exc)})


async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    return JSONResponse(status_code=HTTP_500_INTERNAL_SERVER_ERROR, content={"detail": "Internal server error"})
