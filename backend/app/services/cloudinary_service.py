import os
from typing import Any
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
)


def upload_file(file_path: str, resource_type: str = "auto") -> dict[str, Any]:
    return cloudinary.uploader.upload(file_path, resource_type=resource_type)


def delete_file(public_id: str, resource_type: str = "auto") -> dict[str, Any]:
    return cloudinary.uploader.destroy(public_id, resource_type=resource_type)
