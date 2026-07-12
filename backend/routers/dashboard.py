from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.deps import get_current_user, get_db
from models import Crop, User

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get("")
def get_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    crops = db.query(Crop).filter(Crop.user_id == current_user.id).all()
    total = len(crops)
    qty = sum(c.quantity for c in crops) if crops else 0
    avg = sum(c.market_price for c in crops) / total if total else 0

    return {
        "total_crops": total,
        "total_quantity": qty,
        "average_market_price": avg,
        "user": {
            "id": current_user.id,
            "full_name": current_user.full_name,
            "role": current_user.role,
        },
    }
