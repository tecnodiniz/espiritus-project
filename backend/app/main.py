from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
import crud, models, schemas, database

app = FastAPI()

# models.Base.metadata.create_all(bind=database.engine)

@app.get("/")
def read_root():
    return {"message":"API v0", "status":"ok"}

@app.post("/users/", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    return crud.create_user(db, user)

@app.get("/users/", response_model=list[schemas.UserResponse])
def get_users(db: Session = Depends(database.get_db)):
    users = crud.get_users(db)
    return users

@app.post("/terreiros/", response_model=schemas.TerreiroResponse)
def create_terreiro(terreiro: schemas.TerreiroCreate, db: Session = Depends(database.get_db)):
    return crud.create_terreiro(db,terreiro)    