from .db import db, environment, SCHEMA, add_prefix_for_prod

class Listing(db.Model):
    __tablename__ = 'listings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float(2), nullable=False)
    category = db.Column(db.String(255))
    description = db.Column(db.String(2000), nullable=False)
    user = db.relationship('User', back_populates='listings')
    images = db.relationship('ListingImage', back_populates='listing', cascade="all, delete-orphan" )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'userId': self.user_id,
            'price': self.price,
            'category': self.category,
            'description': self.description
        }
