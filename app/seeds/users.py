from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    dan = User(
        username="danieboy", email="dan@gmail.com", password="password")
    brad = User(
        username="bradsome", email="brad@gmail.com", password="password")
    brandon= User(
        username="boosted", email="brandon@gmail.com", password="password"
    )
    jesse = User(
        username="jessehungry", email="jesse@gmail.com", password="password"
    )
    john = User(
        username="johncena", email="john@gmail.com", password="password"
    )
    victor = User(
        username="victor", email="victor@gmail.com", password="password"
    )
    yondu = User(
        username="hesnotyourdaddy", email="yondu@gmail.com", password="password"
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(dan)
    db.session.add(brad)
    db.session.add(brandon)
    db.session.add(jesse)
    db.session.add(john)
    db.session.add(victor)
    db.session.add(yondu)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
