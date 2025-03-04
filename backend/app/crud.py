from uuid import UUID
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
import models, schemas
from passlib.context import CryptContext

pwd_context =  CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)




# USER
def create_user(db:Session, user: schemas.UserCreate):
    db_user = models.User(name=user.name, cpf = user.cpf, plan = user.plan)

    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)

        return db_user
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="cpf já cadastrado!")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Erro interno {e}")

def get_users(db:Session):
    return db.query(models.User).all()

def get_user(user_id: UUID, db: Session):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    return db_user

def update_user(user_id: UUID, user:schemas.UserUpadte, db:Session):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()

    if not db_user: 
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    update_data = user.model_dump(exclude_unset=True)

    try:
        for key, value in update_data.items():
            setattr(db_user, key, value)
        
        db.commit()
        db.refresh(db_user)

        return {"mensagem":"usário atualizado"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"erro interno {e}")


# Auth
def create_auth(db: Session, auth: schemas.AuthCreate):

    password = hash_password(auth.password)
    db_auth = models.Auth(
        user_id = auth.user_id,
        email=auth.email,
        password_hash=password,
        google_id=auth.google_id,
        avatar_url=auth.avatar_url
    )

    try:
        db.add(db_auth)
        db.commit()
        db.refresh(db_auth)

        return db_auth

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Erro interno {e}")


# Terreiro
def create_terreiro(db: Session, terreiro: schemas.TerreiroCreate):
    db_terreiro = models.Terreiro(
        leader=terreiro.leader,
        name=terreiro.name,
        address=terreiro.address,
        contact=terreiro.contact,
        opening_hours=terreiro.opening_hours,
        history=terreiro.history,
        infrastructure=terreiro.infrastructure,
        segment=terreiro.segment
            )
    try:
        db.add(db_terreiro)
        db.commit()
        db.refresh(db_terreiro)

        return db_terreiro

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Erro interno {e}")
    
def get_terreiro(terreiro_id: UUID, db: Session):
    terreiro = db.query(models.Terreiro).filter(models.Terreiro.id == terreiro_id).first()

    if not terreiro:
        raise HTTPException(status_code=404, detail="Terreiro não encontrado")
    
    return terreiro

def get_terreiros(db: Session):
    return db.query(models.Terreiro).all()

def update_terreiro(terreiro_id: UUID, terreiro: schemas.TerreiroUpdate, db:Session):
    db_terreiro = db.query(models.Terreiro).filter(models.Terreiro.id == terreiro_id).first()

    if not db_terreiro:
        raise HTTPException(status_code=404, detail="Terreiro não encontrado")
    
    update_data = terreiro.model_dump(exclude_unset=True)

    try:
        for key, value in update_data.items():
            setattr(db_terreiro, key, value)
        
        db.commit()
        db.refresh(db_terreiro)

        return {"mensagem":"Terreiro atualizado"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno {e}")
    

# Terreiro Roles
def create_terreiroRole(terreiro_role:schemas.TerreiroRoleCreate, db:Session):
    db_role = models.TerreiroRole(position=terreiro_role.position, description=terreiro_role.description)

    try:
        db.add(db_role)
        db.commit()
        db.refresh(db_role)

        return db_role

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno {e}")

def get_terreiroRole(db:Session):
    return db.query(models.TerreiroRole).all()


# Agent
def create_agentTerreiro(agent: schemas.AgentTerreiroCreate, db:Session):
    db_agent = models.AgentTerreiro(
        id_user=agent.id_user, 
        id_terreiro_role=agent.id_terreiro_role, 
        id_terreiro=agent.id_terreiro
        )
    try:
        db.add(db_agent)
        db.commit()
        db.refresh(db_agent)
        return db_agent
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno {e}")
    
def get_agentTerreiro(db:Session):
    return db.query(models.AgentTerreiro).all()