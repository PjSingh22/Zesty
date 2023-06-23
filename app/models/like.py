from .db import db, environment, SCHEMA, add_prefix_for_prod

likes = db.Table(
"likes",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id")),
        primary_key=True
    ),
    db.Column(
        "listing_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("listings.id")),
        primary_key=True
    ),
    # db.UniqueConstraint('user_id', 'post_id')
)

if environment == "production":
    likes.schema = SCHEMA
