from fastapi import APIRouter, Depends, status
from app.middleware.auth import get_current_user
from app.models.user import UserCreate
from app.schemas.auth import LoginRequest, SignupRequest, TokenResponse, UserProfileResponse
from app.services.auth_service import get_user_profile, login_user, signup_user

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def signup(payload: SignupRequest) -> TokenResponse:
    token, user = await signup_user(UserCreate(email=payload.email, password=payload.password, full_name=payload.full_name))
    return TokenResponse(access_token=token)


@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest) -> TokenResponse:
    token, user = await login_user(payload.email, payload.password)
    return TokenResponse(access_token=token)


@router.get("/profile", response_model=UserProfileResponse)
async def profile(current_user: dict = Depends(get_current_user)) -> UserProfileResponse:
    user = await get_user_profile(current_user["sub"])
    return UserProfileResponse(id=user.id or "", email=user.email, full_name=user.full_name)
