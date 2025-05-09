"""Initial migration

Revision ID: 88a015f4d667
Revises: 
Create Date: 2025-05-08 01:17:30.929974

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '88a015f4d667'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('favorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user', sa.String(length=50), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('show',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('showTitle', sa.String(length=50), nullable=True),
    sa.Column('favorites_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['favorites_id'], ['favorites.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('show')
    op.drop_table('user')
    op.drop_table('favorites')
    # ### end Alembic commands ###
