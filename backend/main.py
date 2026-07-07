from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import SessionLocal, engine
from models import Base, Crop
from schemas import CropCreate, CropResponse

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AgriConnect AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {"message":"AgriConnect AI Backend is running"}

@app.get("/api/crops", response_model=list[CropResponse])
def get_crops(db: Session = Depends(get_db)):
    return db.query(Crop).all()

@app.get("/api/crops/{crop_id}", response_model=CropResponse)
def get_crop(crop_id:int, db:Session=Depends(get_db)):
    crop=db.query(Crop).filter(Crop.id==crop_id).first()
    if not crop:
        raise HTTPException(status_code=404, detail="Crop not found")
    return crop

@app.post("/api/crops", response_model=CropResponse, status_code=201)
def create_crop(crop:CropCreate, db:Session=Depends(get_db)):
    new_crop=Crop(**crop.model_dump())
    db.add(new_crop)
    db.commit()
    db.refresh(new_crop)
    return new_crop

@app.put("/api/crops/{crop_id}", response_model=CropResponse)
def update_crop(crop_id:int, updated:CropCreate, db:Session=Depends(get_db)):
    crop=db.query(Crop).filter(Crop.id==crop_id).first()
    if not crop:
        raise HTTPException(status_code=404, detail="Crop not found")
    for k,v in updated.model_dump().items():
        setattr(crop,k,v)
    db.commit()
    db.refresh(crop)
    return crop

@app.delete("/api/crops/{crop_id}")
def delete_crop(crop_id:int, db:Session=Depends(get_db)):
    crop=db.query(Crop).filter(Crop.id==crop_id).first()
    if not crop:
        raise HTTPException(status_code=404, detail="Crop not found")
    db.delete(crop)
    db.commit()
    return {"status":"success","message":"Crop deleted"}

@app.get("/api/dashboard")
def dashboard(db:Session=Depends(get_db)):
    crops=db.query(Crop).all()
    total=len(crops)
    qty=sum(c.quantity for c in crops) if crops else 0
    avg=sum(c.market_price for c in crops)/total if total else 0
    return {
        "total_crops": total,
        "total_quantity": qty,
        "average_market_price": avg
    }
