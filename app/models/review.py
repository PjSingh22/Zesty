from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    listing_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('listings.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    context = db.Column(db.String(400))
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())

    listing = db.relationship("Listing", back_populates="reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'context': self.context,
            'rating': self.rating,
            'userId': self.user_id,
            'createdAt': self.created_at
        }
