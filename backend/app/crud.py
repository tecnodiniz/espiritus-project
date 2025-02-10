from uuid import UUID
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
import models, schemas

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