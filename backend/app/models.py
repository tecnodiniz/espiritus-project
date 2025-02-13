import uuid
from database import Base
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column,Text, String, ForeignKey
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String(255), index=True)
    cpf = Column(String(14), unique=True, nullable=False)
    plan = Column(String(50), nullable=False)

    terreiros = relationship("Terreiro", back_populates="user", uselist=True, cascade="all, delete-orphan")
    mediums = relationship("Medium", back_populates="user", uselist=True, cascade="all, delete-orphan")

class Terreiro(Base):
    __tablename__ = "terreiros"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String(255), index=True, nullable=False)
    address = Column(Text, nullable=False)
    contact = Column(String(50))
    opening_hours = Column(Text)
    history = Column(Text)
    leader = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    infrastructure = Column(Text)
    segment = Column(String(100))

    user = relationship("User", back_populates="terreiros")


class Medium(Base):
    __tablename__ ="mediums"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    type = Column(String(50))
    role = Column(String(100))

    user = relationship("User", back_populates="mediums")
