from datetime import datetime
from typing import Literal

from pydantic import BaseModel, EmailStr, Field, field_validator

RoleType = Literal["farmer", "buyer", "admin"]


class UserBase(BaseModel):
    email: EmailStr
    full_name: str = Field(min_length=2, max_length=100)


class UserRegister(UserBase):
    password: str = Field(min_length=8, max_length=128)
    role: RoleType = "farmer"

    @field_validator("full_name")
    @classmethod
    def strip_name(cls, value: str) -> str:
        return value.strip()


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(UserBase):
    id: int
    role: RoleType
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class CropBase(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    quantity: int = Field(ge=0)
    location: str = Field(min_length=1, max_length=200)
    market_price: int = Field(ge=0)


class CropCreate(CropBase):
    pass


class CropResponse(CropBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
