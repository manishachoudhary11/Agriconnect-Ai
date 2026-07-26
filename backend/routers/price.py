from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from core.deps import get_current_user_optional, get_db
from models import User
from services.price_service import get_price_prediction, CROP_PRICES

router = APIRouter(prefix="/api/prices", tags=["prices"])


@router.get("/predict")
def predict_price(
    crop: str = Query(default="wheat"),
    db: Session = Depends(get_db),
    current_user: User | None = Depends(get_current_user_optional),
):
    prediction = get_price_prediction(crop)
    return prediction


@router.get("/crops")
def get_supported_crops():
    return list(CROP_PRICES.keys())
