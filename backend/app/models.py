import uuid
from database import Base
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "Users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String(255), index=True)
    cpf = Column(String(14), unique=True, nullable=False)
    plan = Column(String(50), nullable=False)