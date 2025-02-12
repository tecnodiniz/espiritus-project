import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()


try:
    conn = psycopg2.connect(os.getenv("DATABASE_URL"))
    cur = conn.cursor()

    cur.execute("SELECT version();")

    db_version = cur.fetchone()

    print("✅ Conectado com sucesso ao PostgreSQL!")
    print(f"Versão do banco: {db_version[0]}")

    cur.close()
    conn.close()

except Exception as e:
    print(f"❌ Erro ao conectar: {e}")

    