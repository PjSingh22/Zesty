from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reviews():
    reviews = [
        Review(
          user_id = 2,
          listing_id = 1,
          context = "This is some good stuff",
          rating = 5
        ),
        Review(
          user_id = 3,
          listing_id = 1,
          context = "Pretty good but a raccoon stole the rest",
          rating = 4
        ),
        Review(
          user_id = 2,
          listing_id = 2,
          context = "Damn this hits right. Makes me feel like a dolphine jumping over a rainbow on a beautiful sunny day",
          rating = 5
        ),
        Review(
          user_id = 3,
          listing_id = 2,
          context = "ayooooo this some bussin stuff",
          rating = 3
        ),
        Review(
          user_id = 1,
          listing_id = 3,
          context = "nah, this aint it. This is a disgrace to food",
          rating = 1
        ),
        Review(
          user_id = 3,
          listing_id = 3,
          context = "nah, this aint it. This is a disgrace to food",
          rating = 1
        ),
        Review(
          user_id = 1,
          listing_id = 4,
          context = "I dance with the noodles. The noodles dance with me",
          rating = 4
        ),
        Review(
          user_id = 1,
          listing_id = 4,
          context = "I dance with the noodles. The noodles dance with me",
          rating = 4
        )
    ]

    for review in reviews:
        db.session.add(review)

    db.session.commit()

def undo_reviews():
    if environment == "production":
      db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
