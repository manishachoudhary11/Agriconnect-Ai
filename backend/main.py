from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import CORS_ORIGINS
from database import engine
from models import Base
from routers import auth, crops, dashboard

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AgriConnect AI API",
    description="Production API for AgriConnect AI 2.0",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(crops.router)
app.include_router(dashboard.router)


@app.get("/")
def home():
    return {"message": "AgriConnect AI Backend is running", "version": "2.0.0"}
