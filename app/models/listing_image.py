from .db import db, environment, SCHEMA, add_prefix_for_prod

class ListingImage(db.Model):
    __tablename = 'listing_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
