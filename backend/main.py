from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="AgriConnect AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Crop(BaseModel):
    name: str
    quantity: int
    location: str
    market_price: int

crops = [
    {
        "id": 1,
        "name": "Wheat",
        "quantity": 500,
        "location": "Nashik",
        "market_price": 2450,
    },
    {
        "id": 2,
        "name": "Rice",
        "quantity": 700,
        "location": "Pune",
        "market_price": 3200,
    },
]

@app.get("/")
def home():
    return {"message": "AgriConnect AI Backend is running"}

@app.get("/api/crops")
def get_crops():
    return {"status": "success", "data": crops}

@app.get("/api/crops/search")
def search_crops(name: str):
    results = [
        crop for crop in crops
        if name.lower() in crop["name"].lower()
    ]
    return {"status": "success", "data": results}

@app.get("/api/crops/{crop_id}")
def get_crop(crop_id: int):
    for crop in crops:
        if crop["id"] == crop_id:
            return {"status": "success", "data": crop}
    raise HTTPException(status_code=404, detail="Crop not found")

@app.post("/api/crops", status_code=201)
def create_crop(crop: Crop):
    new_crop = crop.model_dump()
    new_crop["id"] = len(crops) + 1
    crops.append(new_crop)
    return {
        "status": "success",
        "message": "Crop created",
        "data": new_crop,
    }

@app.put("/api/crops/{crop_id}")
def update_crop(crop_id: int, updated_crop: Crop):
    for index, crop in enumerate(crops):
        if crop["id"] == crop_id:
            crops[index] = {
                "id": crop_id,
                **updated_crop.model_dump(),
            }
            return {
                "status": "success",
                "message": "Crop updated",
                "data": crops[index],
            }

    raise HTTPException(status_code=404, detail="Crop not found")

@app.delete("/api/crops/{crop_id}")
def delete_crop(crop_id: int):
    for crop in crops:
        if crop["id"] == crop_id:
            crops.remove(crop)
            return {
                "status": "success",


                -
                "message": "Crop deleted",
            }

    raise HTTPException(status_code=404, detail="Crop not found")

@app.get("/api/dashboard")
def dashboard():
    return {
        "total_crops": len(crops),
        "total_quantity": sum(crop["quantity"] for crop in crops),
        "average_market_price": sum(crop["market_price"] for crop in crops) / len(crops)
    }