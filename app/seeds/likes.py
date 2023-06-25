from app.models import db, likes, User, Listing, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():
    users = User.query.all()
    listings = Listing.query.all()

    users[0].likes.append(listings[3])
    users[0].likes.append(listings[6])
    users[0].likes.append(listings[9])
    users[0].likes.append(listings[12])
    users[0].likes.append(listings[15])
    users[0].likes.append(listings[18])
    users[0].likes.append(listings[21])

    db.session.commit()

def undo_likes():
    if environment == "production":
      db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
      db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
