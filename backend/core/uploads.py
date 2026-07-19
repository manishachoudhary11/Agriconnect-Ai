import os
import uuid
from pathlib import Path

from fastapi import UploadFile

UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "uploads"))
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB


async def save_upload(file: UploadFile, subfolder: str = "general") -> str:
    ext = Path(file.filename or "").suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise ValueError(f"File type {ext} not allowed. Use: JPG, PNG, WEBP")

    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise ValueError("File size exceeds 5MB limit")

    folder = UPLOAD_DIR / subfolder
    folder.mkdir(parents=True, exist_ok=True)

    filename = f"{uuid.uuid4().hex}{ext}"
    filepath = folder / filename
    filepath.write_bytes(content)

    return f"/uploads/{subfolder}/{filename}"
