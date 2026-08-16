import os
from dotenv import load_dotenv

load_dotenv()

# ==========================================
# SECURITY
# ==========================================

SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "CHANGE_THIS_TO_A_LONG_RANDOM_SECRET_IN_PRODUCTION"
)

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30")
)

REFRESH_TOKEN_EXPIRE_DAYS = int(
    os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "7")
)

# ==========================================
# DATABASE
# ==========================================

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./agriconnect.db"
)

# ==========================================
# FRONTEND & CORS
# ==========================================

DEFAULT_CORS_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:5175",
    "http://127.0.0.1:5176",
]

env_cors = os.getenv("CORS_ORIGINS", "")
if env_cors:
    parsed_origins = [origin.strip() for origin in env_cors.split(",") if origin.strip()]
    CORS_ORIGINS = list(set(DEFAULT_CORS_ORIGINS + parsed_origins))
else:
    CORS_ORIGINS = DEFAULT_CORS_ORIGINS