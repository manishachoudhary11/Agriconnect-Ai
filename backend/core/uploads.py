import os
import uuid
from fastapi import UploadFile

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "static", "uploads")
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}


async def save_upload(file: UploadFile, subfolder: str = "general") -> str:
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        ext = ".jpg"

    folder = os.path.join(UPLOAD_DIR, subfolder)
    os.makedirs(folder, exist_ok=True)

    filename = f"{uuid.uuid4().hex}{ext}"
    file_path = os.path.join(folder, filename)

    content = await file.read()
    with open(file_path, "wb") as f:
        f.write(content)

    return f"/static/uploads/{subfolder}/{filename}"
