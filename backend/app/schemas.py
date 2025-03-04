from uuid import UUID
from typing import Optional, Any,List
from pydantic import BaseModel, computed_field,  ConfigDict
import models


# User
class UserBase(BaseModel):
    id: Optional[UUID] = None # Remove this on prod
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
        from_attributes = True

class UserDetailResponse(UserBase):
    id: UUID
    agents:Optional[List["AgentTerreiroBasicResponse"]] = None

    class Config:
        from_attributes = True

# Auth
class AuthBase(BaseModel):
    user_id: UUID
    email: str
    google_id: Optional[str] = None
    avatar_url: Optional[str] = None

class AuthCreate(AuthBase):
    password: str

class AuthResponse(AuthBase):
    id: UUID

    class Config:
        from_attributes = True
    



# Terreiro Roles
class TerreiroRoleBase(BaseModel):
    id: Optional[UUID] = None # Remove
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
    user: "UserResponse"
    role: "TerreiroRoleResponse"
    
    class Config:
        from_attributes = True

class AgentTerreiroBasicResponse(BaseModel):
    role: Optional["TerreiroRoleResponse"] = None
    terreiro: Optional["TerreiroBasicResponse"] = None

    class Config:
        from_attributes = True

# Terreiro
class TerreiroBase(BaseModel):
    id: Optional[UUID] = None # Remove this on prod
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
    

class PureTerreiroResponse(TerreiroBase):
    id: UUID
    class Config:
        from_attributes = True

class TerreiroResponse(TerreiroBase):
    id: UUID
    leader: UUID
    user: UserResponse
    
    agents: Optional[List[AgentTerreiroResponse]] = None

    class Config:
        from_attributes = True

class TerreiroBasicResponse(TerreiroBase):
    id: UUID
    leader: UUID 
    user: UserResponse

    class Config:
        from_attributes = True




UserResponse.model_rebuild()
TerreiroRoleResponse.model_rebuild()
AgentTerreiroResponse.model_rebuild()
TerreiroResponse.model_rebuild()

