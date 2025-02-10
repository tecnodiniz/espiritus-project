from pydantic import BaseModel
from uuid import UUID

class UserBase(BaseModel):
    name: str
    cpf: str
    plan: str
    
class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: UUID
    
    class Config:
        from_attributes: True

