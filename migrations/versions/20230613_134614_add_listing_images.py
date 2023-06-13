"""add_listing_images

Revision ID: 94e4cb5100f1
Revises: 54f379ee5807
Create Date: 2023-06-13 13:46:14.426746

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '94e4cb5100f1'
down_revision = '54f379ee5807'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('listing_image',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('listing_id', sa.Integer(), nullable=True),
    sa.Column('image_url', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['listing_id'], ['listings.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###

    if environment == "production":
        op.execute(f"ALTER TABLE listing_image SET SCHEMA {SCHEMA};")


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('listing_image')
    # ### end Alembic commands ###