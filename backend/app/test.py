
from database import SessionLocal
import models, schemas

db = SessionLocal()

terreiro = db.query(models.Terreiro).filter(models.Terreiro.id == "2d848b4c-96a1-4559-b247-1799b45b23bf").first()
ricardo = db.query(models.User).filter(models.User.cpf =="444.444.444-44").first()
role = db.query(models.TerreiroRole).filter(models.TerreiroRole.position == "Tabaqueiro").first()
# assoc =  models.AgentTerreiro(id_terreiro_role=role.id, id_user=ricardo.id, id_terreiro=terreiro.id)

# db.add(models.User(name="string",plan="string", cpf="string"))


print("Ricardo")
print(ricardo.agents[0].terreiro.name)
print(ricardo.agents[0].role.position)
print("-----")

terreiro = db.query(models.Terreiro).filter(models.Terreiro.id == "2d848b4c-96a1-4559-b247-1799b45b23bf").first()
user = db.query(models.User).filter(models.User.cpf =="string").first()
role = db.query(models.TerreiroRole).filter(models.TerreiroRole.position == "Medium").first()
# assoc =  models.AgentTerreiro(id_terreiro_role=role.id, id_user=user.id, id_terreiro=terreiro.id)


for members in terreiro.agents:
    print(members.user.name)