from app.models import db, Listing, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_listings():
   listings = [
    Listing(
       name= "Lay's Potato Chips: Kobe Steak",
       user_id=1,
       price= 3.49,
       description="Take your taste buds on an around-the-world culinary adventure with the snacks you know and love. Ultra buttery and savory, these Taiwanese-exclusive Lay’s Potato Chips taste like the famous and luxurious Kobe steak from Japan!"
    ),
    Listing(
       name= "Lay's Potato Chips: Rib Eye Steak with Black Truffle",
       user_id=1,
       price=3.49,
       description="Save yourself the time of crafting a four-course dinner by crunching on these rib eye steak with black truffle-flavored chips! These Lay's potato chips have a delicious, decadent, savory flavor that you won't find anywhere else (literally - these chips are only sold in Taiwan!). They're crispy, crunchy, and full of flavor. Enjoy these potato chips as-is, or turn them into a tasty bowl of nachos by adding cheese, salsa, guacamole, and lettuce."
    ),
    Listing(
       name="Nissin Cup Noodle: Seafood",
       user_id=2,
       price=3.99,
       description="This soup is chock full of seafood: snow crab, pollock, and white fish plump up as if by magic in a lip-smackingly savory chicken and pork both. All you need is some boiled water and a couple minutes for the perfect meal."
    ),
    Listing(
       name="Nissin Cup Noodle: Curry",
       user_id=2,
       price=3.99,
       description="TThis one is for the Japanese curry fans! If you’re craving that iconic thick, sweet-and-salty dish and want it now, try it with some ramen. And where better to get your instant fix than from the company that created the very first “cup of noodles?” Japanese curry is milder, sweeter, and thicker than those of other cuisines. Try it yourself—all you need is some boiled water and a couple minutes!"
    ),
    Listing(
       name="Japanese Kit Kat: Cheesecake",
       user_id=3,
       price=8.99,
       description="The fantastic thing about Japanese Kit Kats is that they will taste just like their namesake, not just a whisper of artificial flavor coming from the other room. Take this limited edition cheesecake flavor - the smooth white chocolate cheesecake coating is not only sweet but has that subtle tanginess that all good cheesecakes boast. You need to taste it to believe it! Only available in Japan, each package contains 9 mini KitKat bars!"
    ),
    Listing(
       name="Kubota Daifuku Mochi: Strawberry",
       user_id=3,
       price=5.49,
       description="For fans of Asian sweets, one constant frustration is the difficulty of accessing the more eat-it-ASAP, texture-sensitive goods. Well, this mochi is the real deal, and it can be delivered to you fresh! These mochi are a mix of traditional and 21st century: stuffed with creamy red bean paste, flavored with strawberry."
    ),
    # listing 7
    Listing(
       name="Kubota Daifuku Mochi: Black Sesame",
       user_id=1,
       price=5.49,
       description="Classic mochi is great but why stop there? Meet daifuku mochi - all the chewiness you love, but now encasing a delicious filling for an extra flavorful step. This sesame-flavored daifuku mochi is perfect for those who are craving something nutty and mildly sweet."
    ),
    Listing(
       name="Itoen Oi Ocha Green Tea",
       user_id=1,
       price=2.75,
       description="Those looking for a drink to freshen up the mind, body, and soul may find that Oi Ocha Green Tea does the trick! This unsweetened, zero calorie, and lightly caffeinated bottle comes from Ito En, Japan’s Number One green tea brand. Green tea newcomers, take note: ocha is not matcha: it’s thinner, less bitter, and lower in caffeine."
    ),
    Listing(
       name="Coca Cola Qoo: Orange",
       user_id=2,
       price=2.99,
       description="Qoo Orange is one of the most recognizable beverages in Japan, with its adorable cat mascot and secure spot in popular culture backed up by its maker, Coca-Cola. Containing 20% juice with no preservatives, this Japanese answer to Hi-C is a great alternative for soda for kids, especially. Non-carbonated, it's great for rehydration and just plain tastes good, so make sure you've got enough on hand for everyone!"
    ),
    # Listing 10
    Listing(
       name="Kewpie Japanese Mayonnaise: Original Tube",
       user_id=2,
       price=8.99,
       description="This is the iconic and beloved “Kewpie” mayo, easily recognized for its signature Kewpie baby doll design! What makes this mayo special is not only its artwork: this Japanese mayo is ultra-smooth and contains multiple vinegars that provide a complex umami flavor. Its packaging should also be noted for how truly easy it is to squeeze: you won't lose a dollop of this super tasty mayo!"
    ),
    Listing(
       name="Bokksu Yuzu Hot Sauce",
       user_id=3,
       price=8.99,
       description="You won't need to ask-o for the Tobasco with this yuzu hot sauce in your condiment arsenal. Like any good hot sauce, this bottle packs a lot of flavors and complex heat! It's made with zesty yuzu kosho, a paste of fermented yuzu peel and pepper, to create a spicy and tangy that's hard to beat."
    ),
    Listing(
       name="Hikari Menraku Ramen Bowl: Flaming Hot Miso",
       user_id=3,
       price=4.25,
       description="Like the classics but looking for a little spice? Try this Flaming Hot Miso ramen! It boasts a classic creamy and full-bodied miso broth accented with hot chilis. This instant ramen also includes tofu and vegetables, so it's a full meal you can enjoy in just minutes!"
    ),
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
