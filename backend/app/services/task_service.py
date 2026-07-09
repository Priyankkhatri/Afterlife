from app.database.database import db
from app.models.task import TaskCreate
from app.schemas.task import TaskCreateRequest, TaskResponse


async def list_tasks(user_id: str) -> list[TaskResponse]:
    tasks = await db["tasks"].find({"user_id": user_id}).to_list(length=100)
    return [TaskResponse(id=str(task["_id"]), title=task["title"], description=task.get("description"), completed=task.get("completed", False)) for task in tasks]


async def create_task(user_id: str, payload: TaskCreateRequest) -> TaskResponse:
    task_data = TaskCreate(title=payload.title, description=payload.description, completed=False)
    result = await db["tasks"].insert_one({**task_data.model_dump(), "user_id": user_id})
    return TaskResponse(id=str(result.inserted_id), title=payload.title, description=payload.description, completed=False)
