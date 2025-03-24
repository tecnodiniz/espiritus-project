"""ENUM create on AgentTerreiro

Revision ID: cd50fec58118
Revises: 3abc8a6bc263
Create Date: 2025-03-24 20:29:57.175160

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'cd50fec58118'
down_revision: Union[str, None] = '3abc8a6bc263'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

agente_status_enum = sa.Enum('PENDENTE', 'ATIVO', 'INATIVO', name='agente_status')

def upgrade() -> None:
    # Criar o tipo ENUM antes de usá-lo
    agente_status_enum.create(op.get_bind(), checkfirst=True)
    
    # Adicionar a coluna com ENUM e valor padrão
    op.add_column(
        'agente_terreiros', 
        sa.Column('status', agente_status_enum, nullable=False, server_default="PENDENTE")
    )


def downgrade() -> None:
    # Remover a coluna primeiro
    op.drop_column('agente_terreiros', 'status')

    # Dropar o ENUM apenas se não estiver mais em uso
    agente_status_enum.drop(op.get_bind(), checkfirst=True)
