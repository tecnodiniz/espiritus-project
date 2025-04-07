import hashlib
import pdb
from typing import Optional
import magic
import uuid
import os

def generate_hash_files(filename: str) -> str:
    name, ext = os.path.splitext(filename)

    unique_id = str(uuid.uuid4())
    hash_obj = hashlib.sha256((filename + unique_id).encode())
    hex_dig = hash_obj.hexdigest()
    return hex_dig + ext

def get_mime_type(file_path: str) -> str:
    mime = magic.Magic(mime=True)
    return mime.from_file(file_path)


def find_image_path(directory: str, image_hash: str) -> Optional[str]:
    for filename in os.listdir(directory):
        if filename.startswith(image_hash):
            return os.path.join(directory,filename)
    return None