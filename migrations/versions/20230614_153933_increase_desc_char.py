"""increase desc char

Revision ID: d4e78bb0c34f
Revises: 94e4cb5100f1
Create Date: 2023-06-14 15:39:33.720331

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'd4e78bb0c34f'
down_revision = '94e4cb5100f1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('listings', schema=None) as batch_op:
        batch_op.alter_column('description',
               existing_type=sa.VARCHAR(length=255),
               type_=sa.String(length=2000),
               existing_nullable=False)

    # ### end Alembic commands ###
        if environment == "production":
          op.execute(f"ALTER TABLE listings SET SCHEMA {SCHEMA};")


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('listings', schema=None) as batch_op:
        batch_op.alter_column('description',
               existing_type=sa.String(length=2000),
               type_=sa.VARCHAR(length=255),
               existing_nullable=False)

    # ### end Alembic commands ###
