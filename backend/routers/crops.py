from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from core.deps import get_current_user, get_db, require_roles
from models import Crop, User
from schemas import CropCreate, CropResponse

router = APIRouter(prefix="/api/crops", tags=["crops"])


@router.get("", response_model=list[CropResponse])
def get_crops(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db.query(Crop).filter(Crop.user_id == current_user.id).all()


@router.get("/{crop_id}", response_model=CropResponse)
def get_crop(
    crop_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    crop = (
        db.query(Crop)
        .filter(Crop.id == crop_id, Crop.user_id == current_user.id)
        .first()
    )
    if not crop:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Crop not found")
    return crop


@router.post("", response_model=CropResponse, status_code=status.HTTP_201_CREATED)
def create_crop(
    payload: CropCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("farmer", "admin")),
):
    crop = Crop(**payload.model_dump(), user_id=current_user.id)
    db.add(crop)
    db.commit()
    db.refresh(crop)
    return crop


@router.put("/{crop_id}", response_model=CropResponse)
def update_crop(
    crop_id: int,
    payload: CropCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("farmer", "admin")),
):
    crop = (
        db.query(Crop)
        .filter(Crop.id == crop_id, Crop.user_id == current_user.id)
        .first()
    )
    if not crop:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Crop not found")

    for key, value in payload.model_dump().items():
        setattr(crop, key, value)

    db.commit()
    db.refresh(crop)
    return crop


@router.delete("/{crop_id}")
def delete_crop(
    crop_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("farmer", "admin")),
):
    crop = (
        db.query(Crop)
        .filter(Crop.id == crop_id, Crop.user_id == current_user.id)
        .first()
    )
    if not crop:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Crop not found")

    db.delete(crop)
    db.commit()
    return {"status": "success", "message": "Crop deleted"}
