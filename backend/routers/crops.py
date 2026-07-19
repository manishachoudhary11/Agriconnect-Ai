from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File, status
from sqlalchemy.orm import Session
from math import ceil

from core.deps import get_current_user, get_db, require_roles
from core.uploads import save_upload
from models import Crop, User
from schemas import CropCreate, CropResponse, PaginatedCrops

router = APIRouter(prefix="/api/crops", tags=["crops"])


@router.get("", response_model=PaginatedCrops)
def get_crops(
    search: str = Query(default="", max_length=100),
    location: str = Query(default="", max_length=200),
    category: str = Query(default="", max_length=100),
    status: str = Query(default="", max_length=50),
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=10, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = db.query(Crop).filter(Crop.user_id == current_user.id)

    if search:
        query = query.filter(Crop.name.ilike(f"%{search}%"))
    if location:
        query = query.filter(Crop.location.ilike(f"%{location}%"))
    if category:
        query = query.filter(Crop.category.ilike(f"%{category}%"))
    if status:
        query = query.filter(Crop.status == status)

    total = query.count()
    crops = query.order_by(Crop.id.desc()).offset((page - 1) * limit).limit(limit).all()

    return PaginatedCrops(
        items=crops,
        total=total,
        page=page,
        limit=limit,
        pages=ceil(total / limit) if total else 1,
    )


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


@router.post("/{crop_id}/upload-image", response_model=CropResponse)
async def upload_crop_image(
    crop_id: int,
    file: UploadFile = File(...),
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

    try:
        image_url = await save_upload(file, "crops")
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    crop.image_url = image_url
    db.commit()
    db.refresh(crop)
    return crop
