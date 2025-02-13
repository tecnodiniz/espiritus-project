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