"""TerreiroRole created | Medium deleted

Revision ID: 74526cd66c3d
Revises: 85cf12b86d6b
Create Date: 2025-02-14 12:15:16.223886

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '74526cd66c3d'
down_revision: Union[str, None] = '85cf12b86d6b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('terreiro_roles',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('position', sa.String(length=50), nullable=True),
    sa.Column('description', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_terreiro_roles_id'), 'terreiro_roles', ['id'], unique=False)
    op.drop_index('ix_mediums_id', table_name='mediums')
    op.drop_table('mediums')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('mediums',
    sa.Column('id', sa.UUID(), autoincrement=False, nullable=False),
    sa.Column('user_id', sa.UUID(), autoincrement=False, nullable=False),
    sa.Column('type', sa.VARCHAR(length=50), autoincrement=False, nullable=True),
    sa.Column('role', sa.VARCHAR(length=100), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='mediums_user_id_fkey', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name='mediums_pkey')
    )
    op.create_index('ix_mediums_id', 'mediums', ['id'], unique=False)
    op.drop_index(op.f('ix_terreiro_roles_id'), table_name='terreiro_roles')
    op.drop_table('terreiro_roles')
    # ### end Alembic commands ###
