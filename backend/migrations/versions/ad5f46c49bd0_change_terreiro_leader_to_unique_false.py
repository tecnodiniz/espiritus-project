"""change terreiro.leader to unique=false

Revision ID: ad5f46c49bd0
Revises: 985e9052fad0
Create Date: 2025-02-20 22:21:06.886965

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ad5f46c49bd0'
down_revision: Union[str, None] = '985e9052fad0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('terreiros_leader_key', 'terreiros', type_='unique')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('terreiros_leader_key', 'terreiros', ['leader'])
    # ### end Alembic commands ###
