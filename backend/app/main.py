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

# POST TERREIRO_ROLE
@app.post("/terreiro_roles/", response_model=schemas.TerreiroRoleResponse)
def create_terreiroRole(terreiro_role:schemas.TerreiroRoleCreate, db:Session = Depends(database.get_db)):
    return crud.create_terreiroRole(terreiro_role, db)


@app.get("/terreiro_roles/", response_model=list[schemas.TerreiroRoleResponse])
def get_terreiroRoles(db:Session=Depends(database.get_db)):
    return crud.get_terreiroRole(db)

# POST AGENT TERREIRO
@app.post("/agent_terreiro/", response_model=schemas.AgentTerreiroResponse)
def create_agentTerreiro(agent: schemas.AgentTerreiroCreate, db:Session=Depends(database.get_db)):
    return crud.create_agentTerreiro(agent, db)


# GET AGENT TERREIRO
@app.get("/agent_terreiro/",response_model=list[schemas.AgentTerreiroResponse])
def get_agentsTerreiro(db:Session=Depends(database.get_db)):
    return crud.get_agentTerreiro(db)