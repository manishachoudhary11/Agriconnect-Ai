from datetime import datetime
from typing import Literal, Optional

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


class UserUpdate(BaseModel):
    full_name: Optional[str] = Field(None, min_length=2, max_length=100)
    phone: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None


class PasswordChange(BaseModel):
    current_password: str
    new_password: str = Field(min_length=8, max_length=128)


class UserResponse(UserBase):
    id: int
    role: RoleType
    is_active: bool
    created_at: datetime
    avatar_url: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    profile_complete: bool = False

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
    category: Optional[str] = None
    status: Optional[str] = "growing"
    description: Optional[str] = None


class CropCreate(CropBase):
    pass


class CropResponse(CropBase):
    id: int
    user_id: int
    image_url: Optional[str] = None
    planted_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class PaginatedCrops(BaseModel):
    items: list[CropResponse]
    total: int
    page: int
    limit: int
    pages: int


class ListingCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: Optional[str] = None
    crop_name: str
    quantity: int = Field(gt=0)
    unit: str = "kg"
    price_per_unit: int = Field(gt=0)
    location: str
    category_id: Optional[int] = None


class ListingResponse(ListingCreate):
    id: int
    seller_id: int
    image_url: Optional[str] = None
    status: str
    created_at: datetime
    seller_name: Optional[str] = None

    class Config:
        from_attributes = True


class OrderCreate(BaseModel):
    listing_id: int
    quantity: int = Field(gt=0)
    message: Optional[str] = None


class OrderResponse(BaseModel):
    id: int
    listing_id: int
    buyer_id: int
    quantity: int
    total_price: int
    status: str
    message: Optional[str] = None
    created_at: datetime
    listing_title: Optional[str] = None

    class Config:
        from_attributes = True


class CategoryResponse(BaseModel):
    id: int
    name: str
    slug: str
    description: Optional[str] = None

    class Config:
        from_attributes = True


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)
    conversation_id: Optional[int] = None


class ChatResponse(BaseModel):
    conversation_id: int
    message: str
    role: str = "assistant"


class MessageResponse(BaseModel):
    id: int
    role: str
    content: str
    created_at: datetime

    class Config:
        from_attributes = True


class ConversationResponse(BaseModel):
    id: int
    title: str
    created_at: datetime
    updated_at: datetime
    messages: list[MessageResponse] = []

    class Config:
        from_attributes = True


class DiseaseResponse(BaseModel):
    disease_name: str
    confidence: float
    treatment: str
    organic_solution: str
    chemical_solution: str
    preventive_measures: str
    image_url: str


class NotificationResponse(BaseModel):
    id: int
    title: str
    message: str
    type: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True
