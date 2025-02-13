from uuid import UUID
from typing import Optional
from pydantic import BaseModel


class UserBase(BaseModel):
    name: str
    cpf: str
    plan: str
    
class UserCreate(UserBase):
    pass

class UserUpadte(BaseModel):
    name: Optional[str] = None
    cpf: Optional[str] = None
    plan: Optional[str] = None
    
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

class TerreiroUpdate(BaseModel):
    name:           Optional[str] = None
    address:        Optional[str] = None
    contact:        Optional[str] = None
    opening_hours:  Optional[str] = None
    history:        Optional[str] = None
    infrastructure: Optional[str] = None
    segment:        Optional[str] = None
    
class TerreiroResponse(TerreiroBase):
    id: UUID
    leader: UUID

    user: UserResponse

    class Config:
        from_attributes = True

class MediumBase(BaseModel):
    user_id: UUID
    type: str
    role: str

class MediumCreate(MediumBase):
    pass

class MediumResponse(MediumBase):
    id: UUID
    user_id: UUID

    user: UserResponse
    
    class Config:
        from_attributes = True