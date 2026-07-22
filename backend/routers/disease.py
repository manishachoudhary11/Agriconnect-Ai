from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from sqlalchemy.orm import Session

from core.deps import get_current_user, get_db
from core.uploads import save_upload
from models import DiseaseScan, User
from services.disease_service import predict_disease

router = APIRouter(prefix="/api/disease", tags=["disease"])


@router.post("/scan")
async def scan_disease(
    file: UploadFile = File(...),
    crop_type: str = "default",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image file (JPG, PNG, WEBP).")

    try:
        image_url = await save_upload(file, "scans")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    prediction = predict_disease(crop_type)

    scan_record = DiseaseScan(
        user_id=current_user.id,
        image_url=image_url,
        disease_name=prediction["disease_name"],
        confidence=prediction["confidence"],
        treatment=prediction["treatment"],
        organic_solution=prediction["organic_solution"],
        chemical_solution=prediction["chemical_solution"],
        preventive_measures=prediction["preventive_measures"],
    )
    db.add(scan_record)
    db.commit()
    db.refresh(scan_record)

    return {
        "id": scan_record.id,
        "image_url": image_url,
        "disease_name": prediction["disease_name"],
        "confidence": prediction["confidence"],
        "treatment": prediction["treatment"],
        "organic_solution": prediction["organic_solution"],
        "chemical_solution": prediction["chemical_solution"],
        "preventive_measures": prediction["preventive_measures"],
        "created_at": scan_record.created_at,
    }


@router.get("/history")
def get_scan_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    scans = (
        db.query(DiseaseScan)
        .filter(DiseaseScan.user_id == current_user.id)
        .order_by(DiseaseScan.created_at.desc())
        .all()
    )
    return scans
