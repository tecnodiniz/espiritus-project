import psycopg2

DATABASE_URL = f"postgresql://eduardo:l0ck3d0u7@localhost:5432/espiritus"

try:
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()

    cur.execute("SELECT version();")

    db_version = cur.fetchone()

    print("✅ Conectado com sucesso ao PostgreSQL!")
    print(f"Versão do banco: {db_version[0]}")

    cur.close()
    conn.close()

except Exception as e:
    print(f"❌ Erro ao conectar: {e}")

    