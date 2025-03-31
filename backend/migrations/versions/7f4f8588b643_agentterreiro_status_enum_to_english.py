from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# Revision identifiers, used by Alembic.
revision: str = '7f4f8588b643'
down_revision: Union[str, None] = 'cd50fec58118'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

# Definição dos ENUMs
agente_status_enum = sa.Enum('PENDENTE', 'ATIVO', 'INATIVO', name='agente_status')
agent_status_enum = sa.Enum('PENDING', 'ACTIVE', 'INACTIVE', name='agent_status')

def upgrade() -> None:
    bind = op.get_bind()

    # Criar o novo ENUM antes de alterar a coluna
    agent_status_enum.create(bind, checkfirst=True)

    # Remover o default antes de alterar o tipo
    op.execute("ALTER TABLE agente_terreiros ALTER COLUMN status DROP DEFAULT")

    # Alterar a coluna status para o novo ENUM com conversão explícita
    op.execute("""
        ALTER TABLE agente_terreiros 
        ALTER COLUMN status TYPE agent_status 
        USING status::text::agent_status
    """)

    # Restaurar o default ajustado
    op.execute("ALTER TABLE agente_terreiros ALTER COLUMN status SET DEFAULT 'PENDING'::agent_status")

    # Remover o ENUM antigo
    agente_status_enum.drop(bind, checkfirst=True)

def downgrade() -> None:
    bind = op.get_bind()

    # Criar novamente o ENUM antigo
    agente_status_enum.create(bind, checkfirst=True)

    # Remover o default antes de alterar o tipo
    op.execute("ALTER TABLE agente_terreiros ALTER COLUMN status DROP DEFAULT")

    # Alterar a coluna status de volta para o ENUM original
    op.execute("""
        ALTER TABLE agente_terreiros 
        ALTER COLUMN status TYPE agente_status 
        USING status::text::agente_status
    """)

    # Restaurar o default original
    op.execute("ALTER TABLE agente_terreiros ALTER COLUMN status SET DEFAULT 'PENDENTE'::agente_status")

    # Remover o ENUM novo
    agent_status_enum.drop(bind, checkfirst=True)
