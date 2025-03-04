import uuid
from database import Base
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column,Text, String, Boolean, DateTime, func, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String(255), index=True)
    cpf = Column(String(14))
    plan = Column(String(50), default="basic")

    terreiros = relationship("Terreiro", back_populates="user", uselist=True, cascade="all, delete-orphan")
    agents = relationship("AgentTerreiro", back_populates="user", uselist=True, cascade="all, delete-orphan")
    auth = relationship("auth", back_populates="user", uselist=False, cascade="all, delete-orphan")


class Auth(Base):
    __tablename__ = "auth"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    email = Column(String(255))
    password_has = Column(Text)
    google_id = Column(String(255))
    avatar_url = Column(Text)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=func.now)

    user = relationship("User", back_populates="auth")



class Terreiro(Base):
    __tablename__ = "terreiros"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String(255), index=True, nullable=False)
    address = Column(Text, nullable=False)
    contact = Column(String(50))
    opening_hours = Column(Text)
    history = Column(Text)
    leader = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    infrastructure = Column(Text)
    segment = Column(String(100))

    user = relationship("User", back_populates="terreiros")
    agents = relationship("AgentTerreiro", back_populates="terreiro", uselist=True, cascade="all, delete-orphan")

class TerreiroRole(Base):
    __tablename__ = "terreiro_roles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    position = Column(String(50))
    description = Column(Text)

    agents = relationship("AgentTerreiro", back_populates="role", uselist=True, cascade="all, delete-orphan")

class AgentTerreiro(Base):
    __tablename__ = "agente_terreiros"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    id_terreiro_role = Column(UUID(as_uuid=True), ForeignKey("terreiro_roles.id", ondelete="CASCADE"), nullable=False)
    id_user = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    id_terreiro = Column(UUID(as_uuid=True), ForeignKey("terreiros.id", ondelete="CASCADE"), nullable=False)

    __table_args__ = (UniqueConstraint("id_user","id_terreiro", name="uq_user_terreiro"),)

    role = relationship("TerreiroRole", back_populates="agents")
    user = relationship("User", back_populates="agents")
    terreiro = relationship("Terreiro", back_populates="agents")



