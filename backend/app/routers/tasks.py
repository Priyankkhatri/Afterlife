from fastapi import APIRouter, Depends, status
from app.middleware.auth import get_current_user
from app.schemas.task import TaskCreateRequest, TaskResponse
from app.services.task_service import create_task, list_tasks

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("", response_model=list[TaskResponse])
async def get_tasks(current_user: dict = Depends(get_current_user)) -> list[TaskResponse]:
    return await list_tasks(current_user["sub"])


@router.post("", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_new_task(payload: TaskCreateRequest, current_user: dict = Depends(get_current_user)) -> TaskResponse:
    return await create_task(current_user["sub"], payload)
