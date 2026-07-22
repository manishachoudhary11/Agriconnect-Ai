import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from config import CORS_ORIGINS
from database import engine
from models import Base
from routers import ai, auth, crops, dashboard, disease, marketplace, notifications, price, weather

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AgriConnect AI API",
    description="Production API for AgriConnect AI",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

static_path = os.path.join(os.path.dirname(__file__), "static")
os.makedirs(static_path, exist_ok=True)
app.mount("/static", StaticFiles(directory=static_path), name="static")

app.include_router(auth.router)
app.include_router(crops.router)
app.include_router(dashboard.router)
app.include_router(marketplace.router)
app.include_router(ai.router)
app.include_router(disease.router)
app.include_router(weather.router)
app.include_router(price.router)
app.include_router(notifications.router)


@app.get("/")
def home():
    return {"message": "AgriConnect AI Backend is running", "version": "2.0.0"}
