"""add category

Revision ID: d572ee098a32
Revises: d4e78bb0c34f
Create Date: 2023-06-16 10:46:32.236909

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd572ee098a32'
down_revision = 'd4e78bb0c34f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('listings', schema=None) as batch_op:
        batch_op.add_column(sa.Column('category', sa.String(length=255), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('listings', schema=None) as batch_op:
        batch_op.drop_column('category')

    # ### end Alembic commands ###