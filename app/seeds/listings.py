from app.models import db, Listing, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_listings():
   listings = [
    Listing(
       name= "Lay's Potato Chips: Kobe Steak",
       price= 3.49,
       description="Take your taste buds on an around-the-world culinary adventure with the snacks you know and love. Ultra buttery and savory, these Taiwanese-exclusive Lay’s Potato Chips taste like the famous and luxurious Kobe steak from Japan!"
    ),
    Listing(
       name= "Lay's Potato Chips: Rib Eye Steak with Black Truffle",
       price=3.49,
       description="Save yourself the time of crafting a four-course dinner by crunching on these rib eye steak with black truffle-flavored chips! These Lay's potato chips have a delicious, decadent, savory flavor that you won't find anywhere else (literally - these chips are only sold in Taiwan!). They're crispy, crunchy, and full of flavor. Enjoy these potato chips as-is, or turn them into a tasty bowl of nachos by adding cheese, salsa, guacamole, and lettuce."
    ),
    Listing(
       name="Nissin Cup Noodle: Seafood",
       price=3.99,
       description="This soup is chock full of seafood: snow crab, pollock, and white fish plump up as if by magic in a lip-smackingly savory chicken and pork both. All you need is some boiled water and a couple minutes for the perfect meal."
    ),
    Listing(
       name="Nissin Cup Noodle: Curry",
       price=3.99,
       description="TThis one is for the Japanese curry fans! If you’re craving that iconic thick, sweet-and-salty dish and want it now, try it with some ramen. And where better to get your instant fix than from the company that created the very first “cup of noodles?” Japanese curry is milder, sweeter, and thicker than those of other cuisines. Try it yourself—all you need is some boiled water and a couple minutes!"
    ),
    Listing(
       name="Japanese Kit Kat: Cheesecake",
       price=8.99,
       description="The fantastic thing about Japanese Kit Kats is that they will taste just like their namesake, not just a whisper of artificial flavor coming from the other room. Take this limited edition cheesecake flavor - the smooth white chocolate cheesecake coating is not only sweet but has that subtle tanginess that all good cheesecakes boast. You need to taste it to believe it! Only available in Japan, each package contains 9 mini KitKat bars!"
    )
  ]

   for listing in listings:
       db.session.add(listing)

   db.session.commit();




def undo_listings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.listings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM listings"))

    db.session.commit()
