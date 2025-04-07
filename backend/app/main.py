import crud,  schemas, database, models
from fastapi import FastAPI, Depends, UploadFile, File,Form, Request, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import os, shutil
from fastapi.staticfiles import StaticFiles
from utils import generate_hash_files, find_image_path, get_mime_type
from fastapi.responses import HTMLResponse,JSONResponse, FileResponse
from starlette.exceptions import HTTPException as StarLetteHTTPException

app = FastAPI()

UPLOAD_DIR = "a"
os.makedirs(UPLOAD_DIR,exist_ok=True)

app.mount("/a", StaticFiles(directory=UPLOAD_DIR), name="a")

origins = [
    "http://127.0.0.1:5173",
    "https://127.0.0.1:5173",
    "http://localhost:5173",
    "https://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# models.Base.metadata.create_all(bind=database.engine)

@app.exception_handler(StarLetteHTTPException)
def custom_http_exception_handler(request: Request, exc: StarLetteHTTPException):
    if exc.status_code == 404:
        return HTMLResponse(
            content="<h1>404 - Page not found</h1>",
            status_code=404
        )
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail":exc.detail, "request":request},
    )

@app.post("/upload-profile-picture/", response_model=dict)
def upload_profile_picture(user_id: UUID, file: UploadFile = File(...), db: Session=Depends(database.get_db)):
    return crud.upload_user_profile_picture(user_id,file,db)

@app.get("/")
def read_root():
    return {"message":"API v0", "status":"ok"}

@app.get("/profile_picture/{image_id}")
def get_profile_image(image_id: str):
    image_path = find_image_path(UPLOAD_DIR, image_id)
    if not image_path or not os.path.exists(image_path):
        raise HTTPException(status_code=404, detail="Imagem não encontrada")
    
    mime_type = get_mime_type(image_path)
    return FileResponse(image_path, media_type=mime_type)
# CREATE USER
@app.post("/users/", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, auth:schemas.AuthCreate, db: Session = Depends(database.get_db)):
    return crud.create_user(db, user, auth)

@app.get("/users-detail/{user_id}", response_model=schemas.UserDetailResponse)
def get_user(user_id:UUID, db: Session = Depends(database.get_db)):
    return crud.get_user(user_id, db)

# GET USERS
@app.get("/users/", response_model=list[schemas.UserResponse])
def get_users(db: Session = Depends(database.get_db)):
    return crud.get_users(db)

# GET USER
@app.get("/users/{user_id}", response_model=schemas.UserResponse)
def get_user(user_id:UUID, db: Session = Depends(database.get_db)):
    return crud.get_user(user_id, db)

@app.get("/user/terreiros/{user_id}", response_model=list[schemas.TerreiroBasicResponse])
def get_user_terreiros(user_id:UUID, db:Session = Depends(database.get_db)):
    return crud.get_user_terreiros(user_id, db)
# PATH USER
@app.patch("/users/{user_id}", response_model=dict)
def update_user(user_id: UUID, user: schemas.UserUpadte, db: Session=Depends(database.get_db)):
    return crud.update_user(user_id, user, db)

# AUTH
@app.post("/auth/", response_model=schemas.AuthResponse)
def create_auth(auth: schemas.AuthCreate, db: Session = Depends(database.get_db)):
    return crud.create_auth(db,auth)

@app.post("/users/auth",  response_model=schemas.UserDetailResponse)
def authentication(auth: schemas.Authentication, db:Session = Depends(database.get_db)):
    return crud.authentication(db, auth)

# CREATE TERREIRO
@app.post("/terreiros/", response_model=schemas.TerreiroResponse)
def create_terreiro(terreiro: schemas.TerreiroCreate, db: Session = Depends(database.get_db)):
    return crud.create_terreiro(db,terreiro)  

# GET TERREIRO
@app.get("/terreiros/{terreiro_id}", response_model=schemas.TerreiroResponse)
def get_terreiro(terreiro_id: UUID, db: Session = Depends(database.get_db)):
    return crud.get_terreiro(terreiro_id, db)

# CREATE TERREIROS
@app.get("/terreiros/", response_model=list[schemas.TerreiroResponse])  
def get_terreiros(db: Session = Depends(database.get_db)):
    return crud.get_terreiros(db)

# PATCH TERREIRO
@app.patch("/terreiros/{terreiro_id}", response_model=dict)
def update_terreiro(terreiro_id: UUID, terreiro: schemas.TerreiroUpdate, db: Session = Depends(database.get_db)):
    return crud.update_terreiro(terreiro_id, terreiro, db)

# CREATE TERREIRO_ROLE
@app.post("/terreiro_roles/", response_model=schemas.TerreiroRoleResponse)
def create_terreiroRole(terreiro_role:schemas.TerreiroRoleCreate, db:Session = Depends(database.get_db)):
    return crud.create_terreiroRole(terreiro_role, db)


@app.get("/terreiro_roles/", response_model=list[schemas.TerreiroRoleResponse])
def get_terreiroRoles(db:Session=Depends(database.get_db)):
    return crud.get_terreiroRole(db)

# CREATE AGENT TERREIRO
@app.post("/agent_terreiro/", response_model=schemas.AgentTerreiroResponse)
def create_agentTerreiro(agent: schemas.AgentTerreiroCreate, db:Session=Depends(database.get_db)):
    return crud.create_agentTerreiro(agent, db)


# GET AGENT TERREIRO
@app.get("/agent_terreiro/",response_model=list[schemas.AgentTerreiroResponse])
def get_agentsTerreiro(db:Session=Depends(database.get_db)):
    return crud.get_agentTerreiro(db)

# PATCH AGENT TERREIRO
@app.patch("/agent_terreiro/{agent_id}",response_model=dict)
def update_agentTerreiro(agent: schemas.AgenteTerreiroUpdate, agent_id: UUID, db: Session=Depends(database.get_db)):
    return crud.update_agentTerreiro(agent_id,agent,db)

# DELETE AGENT TERREIRO

@app.delete("/agent_terreiro/{agent_id}", response_model=dict)
def delete_agentTerreiro(agent_id: UUID, db:Session=Depends(database.get_db)):
    return crud.delete_agenteTerreiro(agent_id,db)

# END POINTS FOR TEST, ONLY FOR DEVELOPE MODE

# INSERT MASSIVE DATA

@app.post("/users/batch")
def create_multiples_users(users: List[schemas.UserCreate], db:Session=Depends(database.get_db)):
    db_users = [models.User(**user.model_dump()) for user in users]
    db.add_all(db_users)
    db.commit()
    return {"message":"Users has been created","count":len(db_users)}

@app.post("/terreiros/batch")
def create_multiples_terreiros(terreiros: List[schemas.TerreiroCreate], db:Session=Depends(database.get_db)):
    db_terreiros = [models.Terreiro(**terreiro.model_dump()) for terreiro in terreiros]
    db.add_all(db_terreiros)
    db.commit() 
    return {"message":"Terreiros has been created","count":len(db_terreiros)}

@app.post("/tereiro_roles/batch")
def create_multiples_roles(roles: List[schemas.TerreiroRoleCreate], db:Session=Depends(database.get_db)):
    db_roles = [models.TerreiroRole(**role.model_dump()) for role in roles]
    db.add_all(db_roles)
    db.commit()
    return {"message":"Roles has been created","count":len(db_roles)}

@app.post("/agent_terreiro/batch")
def create_multiple_agents(agents: List[schemas.AgentTerreiroCreate], db:Session=Depends(database.get_db)):
    db_agents=[models.AgentTerreiro(**agent.model_dump())for agent in agents]
    db.add_all(db_agents)
    db.commit()
    return {"message":"Agents has been created","count":len(db_agents)}


