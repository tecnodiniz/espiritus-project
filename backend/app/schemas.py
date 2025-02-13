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

class TerreiroBase(BaseModel):
    leader: UUID
    name: str
    address: str
    contact: str
    opening_hours: str
    history: str
    infrastructure: str
    segment: str

class TerreiroCreate(TerreiroBase):
    pass

class TerreiroResponse(TerreiroBase):
    id: UUID
    leader: UUID

    class Config:
        from_attributes = True
