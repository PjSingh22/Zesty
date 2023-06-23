from app.models import db, likes, User, Listing, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():
    users = User.query.all()
    listings = Listing.query.all()

    users[0].likes.append(listings[0])

    db.session.commit()

def undo_likes():
    if environment == "production":
      db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
      db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
