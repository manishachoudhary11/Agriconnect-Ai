from pydantic import BaseModel

class CropBase(BaseModel):
    name: str
    quantity: int
    location: str
    market_price: int

class CropCreate(CropBase):
    pass

class CropResponse(CropBase):
    id: int

    class Config:
        from_attributes = True