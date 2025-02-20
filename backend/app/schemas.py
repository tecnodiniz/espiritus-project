from uuid import UUID
from typing import Optional
from pydantic import BaseModel


# User
class UserBase(BaseModel):
    name: str
    cpf: Optional[str] = None
    plan: Optional[str] = None
    
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

# Terreiro Roles
class TerreiroRoleBase(BaseModel):
    position: str
    description: str

class TerreiroRoleCreate(TerreiroRoleBase):
    pass

class TerreiroRoleResponse(TerreiroRoleBase):
    id: UUID

    class Config:
        from_attributes = True

# Agents
class AgentTerreiroBase(BaseModel):
    id_terreiro_role: UUID
    id_terreiro: UUID
    id_user: UUID

class AgentTerreiroCreate(AgentTerreiroBase):
    pass

class AgentTerreiroResponse(BaseModel):
    id: UUID

    user: UserResponse
    role: TerreiroRoleResponse

    class Config:
        from_attributes: True

# Terreiro
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
    agents: Optional[list[AgentTerreiroResponse]] = None

    class Config:
        from_attributes = True





