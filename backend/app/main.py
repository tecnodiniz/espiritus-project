from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
import crud,  schemas, database

app = FastAPI()

# models.Base.metadata.create_all(bind=database.engine)

@app.get("/")
def read_root():
    return {"message":"API v0", "status":"ok"}

# POST USER
@app.post("/users/", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    return crud.create_user(db, user)

# GET USERS
@app.get("/users/", response_model=list[schemas.UserResponse])
def get_users(db: Session = Depends(database.get_db)):
    return crud.get_users(db)

# PATH USER
@app.patch("/users/{user_id}", response_model=dict)
def update_user(user_id: UUID, user: schemas.UserUpadte, db: Session=Depends(database.get_db)):
    return crud.update_user(user_id, user, db)

# POST TERREIRO
@app.post("/terreiros/", response_model=schemas.TerreiroResponse)
def create_terreiro(terreiro: schemas.TerreiroCreate, db: Session = Depends(database.get_db)):
    return crud.create_terreiro(db,terreiro)  

# GET TERREIRO
@app.get("/terreiros/{terreiro_id}", response_model=schemas.TerreiroResponse)
def get_terreiro(terreiro_id: UUID, db: Session = Depends(database.get_db)):
    return crud.get_terreiro(terreiro_id, db)

# POST TERREIROS
@app.get("/terreiros/", response_model=list[schemas.TerreiroResponse])  
def get_terreiros(db: Session = Depends(database.get_db)):
    return crud.get_terreiros(db)

# PATCH TERREIRO
@app.patch("/terreiros/{terreiro_id}", response_model=dict)
def update_terreiro(terreiro_id: UUID, terreiro: schemas.TerreiroUpdate, db: Session = Depends(database.get_db)):
    return crud.update_terreiro(terreiro_id, terreiro, db)

@app.post("/mediums/", response_model=schemas.MediumResponse)
def create_medium(medium:schemas.MediumCreate, db:Session = Depends(database.get_db)):
    return crud.create_medium(medium,db)

@app.get("/mediums", response_model=list[schemas.MediumResponse])
def get_mediums(db:Session = Depends(database.get_db)):
  return crud.get_mediums(db)