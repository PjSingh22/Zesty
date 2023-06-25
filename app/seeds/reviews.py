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
          user_id = 4,
          listing_id = 1,
          context = "WOW, just mindblowing how lays was able to shove a whole Kobe steak into a potato chip. This is peak technological evolution.",
          rating = 5
        ),
        Review(
          user_id = 5,
          listing_id = 1,
          context = "I'd pay 70k for this.",
          rating = 5
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
          user_id = 7,
          listing_id = 2,
          context = "pretty decent chip.",
          rating = 3
        ),
        Review(
          user_id = 9,
          listing_id = 2,
          context = "didn't like it that much. Could of been better",
          rating = 2
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
          user_id = 6,
          listing_id = 3,
          context = "idk what the review above me is talking about. This stuff is amazing",
          rating = 5
        ),
        Review(
          user_id = 1,
          listing_id = 4,
          context = "I dance with the noodles. The noodles dance with me",
          rating = 4
        ),
        Review(
          user_id = 4,
          listing_id = 4,
          context = "aman demo, aman",
          rating = 5
        ),
        Review(
          user_id = 10,
          listing_id = 4,
          context = "these noodles be poppin off!",
          rating = 4
        ),
        Review(
          user_id = 5,
          listing_id = 4,
          context = "Highly reccomend",
          rating = 5
        ),
        Review(
          user_id = 6,
          listing_id = 4,
          context = "NEVER AGAIN!",
          rating = 1
        ),
        Review(
          user_id = 1,
          listing_id = 5,
          context = "pretty good",
          rating = 4
        ),
        Review(
          user_id = 2,
          listing_id = 5,
          context = "eh its ok",
          rating = 3
        ),
        Review(
          user_id = 4,
          listing_id = 5,
          context = "disgusting!!",
          rating = 1
        ),
        Review(
          user_id = 5,
          listing_id = 6,
          context = "ayoooo this bussin",
          rating = 5
        ),
        Review(
          user_id = 6,
          listing_id = 6,
          context = "mmm strawberry is my fav",
          rating = 5
        ),
        Review(
          user_id = 7,
          listing_id = 6,
          context = "pretty good. more on the sweeter side than i'd like.",
          rating = 3
        ),
        Review(
          user_id = 8,
          listing_id = 6,
          context = "Interesting",
          rating = 4
        ),
        Review(
          user_id = 9,
          listing_id = 6,
          context = "nice",
          rating = 3
        ),
        Review(
          user_id = 10,
          listing_id = 6,
          context = "who puts black sesame inside mochi?",
          rating = 1
        ),
        Review(
          user_id = 2,
          listing_id = 7,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 10,
          listing_id = 7,
          context = "",
          rating = 3
        ),
        Review(
          user_id = 3,
          listing_id = 8,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 5,
          listing_id = 8,
          context = "",
          rating = 4
        ),
        Review(
          user_id = 7,
          listing_id = 9,
          context = "",
          rating = 4
        ),
        Review(
          user_id = 4,
          listing_id = 9,
          context = "",
          rating = 3
        ),
        Review(
          user_id = 4,
          listing_id = 10,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 7,
          listing_id = 10,
          context = "",
          rating = 3
        ),
        Review(
          user_id = 9,
          listing_id = 11,
          context = "",
          rating = 2
        ),
        Review(
          user_id = 1,
          listing_id = 11,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 8,
          listing_id = 11,
          context = "",
          rating = 4
        ),
        Review(
          user_id = 2,
          listing_id = 12,
          context = "",
          rating = 4
        ),
        Review(
          user_id = 1,
          listing_id = 12,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 8,
          listing_id = 12,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 5,
          listing_id = 13,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 2,
          listing_id = 13,
          context = "",
          rating = 3
        ),
        Review(
          user_id = 3,
          listing_id = 14,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 1,
          listing_id = 14,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 8,
          listing_id = 15,
          context = "",
          rating = 4
        ),
        Review(
          user_id = 2,
          listing_id = 16,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 8,
          listing_id = 16,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 2,
          listing_id = 17,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 5,
          listing_id = 17,
          context = "",
          rating = 4
        ),
        Review(
          user_id = 3,
          listing_id = 17,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 4,
          listing_id = 18,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 9,
          listing_id = 19,
          context = "",
          rating = 4
        ),
        Review(
          user_id = 3,
          listing_id = 19,
          context = "",
          rating = 4
        ),
        Review(
          user_id = 10,
          listing_id = 20,
          context = "",
          rating = 3
        ),
        Review(
          user_id = 5,
          listing_id = 20,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 7,
          listing_id = 20,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 7,
          listing_id = 20,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 2,
          listing_id = 21,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 8,
          listing_id = 22,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 9,
          listing_id = 22,
          context = "",
          rating = 3
        ),
        Review(
          user_id = 2,
          listing_id = 23,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 1,
          listing_id = 23,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 5,
          listing_id = 23,
          context = "",
          rating = 4
        ),
        Review(
          user_id = 9,
          listing_id = 24,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 4,
          listing_id = 24,
          context = "",
          rating = 3
        ),
        Review(
          user_id = 9,
          listing_id = 25,
          context = "",
          rating = 2
        ),
        Review(
          user_id = 2,
          listing_id = 25,
          context = "",
          rating = 4
        ),
        Review(
          user_id = 6,
          listing_id = 25,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 1,
          listing_id = 26,
          context = "",
          rating = 4
        ),
        Review(
          user_id = 10,
          listing_id = 27,
          context = "",
          rating = 4
        ),
        Review(
          user_id = 2,
          listing_id = 27,
          context = "",
          rating = 4
        ),
        Review(
          user_id = 6,
          listing_id = 28,
          context = "",
          rating = 3
        ),
        Review(
          user_id = 5,
          listing_id = 28,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 7,
          listing_id = 29,
          context = "",
          rating = 4
        ),
        Review(
          user_id = 9,
          listing_id = 29,
          context = "",
          rating = 3
        ),
        Review(
          user_id = 5,
          listing_id = 30,
          context = "",
          rating = 5
        ),
        Review(
          user_id = 7,
          listing_id = 30,
          context = "",
          rating = 3
        ),
        Review(
          user_id = 7,
          listing_id = 30,
          context = "",
          rating = 4
        ),

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
