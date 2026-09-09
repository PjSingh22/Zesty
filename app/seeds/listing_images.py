from app.models import db, ListingImage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_listing_images():
   listing_images = [
    ListingImage(
      listing_id= 1,
      image_url = "/images/lays-front.png"
    ),
    ListingImage(
      listing_id= 1,
      image_url = "/images/lays-1-nutrition.png"
    ),
    ListingImage(
      listing_id= 1,
      image_url = "/images/lays-beef-chips.png"
    ),
    ListingImage(
      listing_id= 1,
      image_url = "/images/lays-beef-store.png"
    ),
    ListingImage(
      listing_id= 2,
      image_url = "/images/lays-ribeye.png"
    ),
    ListingImage(
      listing_id= 3,
      image_url = "/images/seafood-noodles.png"
    ),
    ListingImage(
      listing_id= 3,
      image_url = "/images/seafood-noodles-nutrition.png"
    ),
    ListingImage(
      listing_id= 4,
      image_url = "/images/curry-noodles.png"
    ),
    ListingImage(
      listing_id= 4,
      image_url = "/images/curry-noodles-nutrition.png"
    ),
    ListingImage(
      listing_id= 5,
      image_url = "/images/kitkat-cheesecake.png"
    ),
    ListingImage(
      listing_id= 5,
      image_url = "/images/kitkat-cheesecake-nutrition.png"
    ),
    ListingImage(
      listing_id= 6,
      image_url = "/images/strawberry-mochi.png"
    ),
    ListingImage(
      listing_id= 6,
      image_url = "/images/strawberry-mochi-nutrition.png"
    ),
    ListingImage(
      listing_id= 7,
      image_url = "/images/sesame-mochi.png"
    ),
    ListingImage(
      listing_id= 7,
      image_url = "/images/sesame-mochi-nutrition.png"
    ),
    ListingImage(
      listing_id= 8,
      image_url = "/images/oi-ocha-drink.png"
    ),
    ListingImage(
      listing_id= 8,
      image_url = "/images/oi-ocha-drink-nutrition.png"
    ),
    ListingImage(
      listing_id= 9,
      image_url = "/images/cola-orange.png"
    ),
    ListingImage(
      listing_id= 9,
      image_url = "/images/cola-orange-nutrition.png"
    ),
    ListingImage(
      listing_id= 10,
      image_url = "/images/kewpie-mayo.png"
    ),
    ListingImage(
      listing_id= 10,
      image_url = "/images/kewpie-mayo-nutrition.png"
    ),
    ListingImage(
      listing_id= 11,
      image_url = "/images/yuzu-sauce.png"
    ),
    ListingImage(
      listing_id= 12,
      image_url = "/images/spicy-miso-ramen.png"
    ),
    ListingImage(
      listing_id= 12,
      image_url = "/images/spicy-miso-ramen-nutrition.png"
    ),
    ListingImage(
      listing_id= 13,
      image_url = "images/lays-yakitori.png"
    ),
    ListingImage(
      listing_id= 13,
      image_url = "/images/lays-yakitori-chips.png"
    ),
    ListingImage(
      listing_id= 13,
      image_url = "/images/lays-yakitori-chips-nutrition.png"
    ),
    ListingImage(
      listing_id= 14,
      image_url = "/images/golden-curry.png"
    ),
    ListingImage(
      listing_id= 14,
      image_url = "/images/golden-curry-nutrition.png"
    ),
    ListingImage(
      listing_id= 15,
      image_url = "/images/tempura.png"
    ),
    ListingImage(
      listing_id= 15,
      image_url = "/images/tempura-nutrition.png"
    ),
    ListingImage(
      listing_id= 16,
      image_url = "/images/karaage-chicken.png"
    ),
    ListingImage(
      listing_id= 16,
      image_url = "/images/karaage-chicken-nutrition.png"
    ),
    ListingImage(
      listing_id= 17,
      image_url = "/images/banana-pocky.png"
    ),
    ListingImage(
      listing_id= 17,
      image_url = "/images/banana-pocky-stick.png"
    ),
    ListingImage(
      listing_id= 17,
      image_url = "/images/banana-pocky-nutrition.png"
    ),
    ListingImage(
      listing_id= 18,
      image_url = "/images/strawberry-pocky.png"
    ),
    ListingImage(
      listing_id= 18,
      image_url = "/images/strawberry-pocky-stick.png"
    ),
    ListingImage(
      listing_id= 18,
      image_url = "/images/strawberry-pocky-nutrition.png"
    ),
    ListingImage(
      listing_id= 19,
      image_url = "/images/yopokki.png"
    ),
    ListingImage(
      listing_id= 19,
      image_url = "/images/yopokki-nutrition.png"
    ),
    ListingImage(
      listing_id= 20,
      image_url = "/images/tonkotsu-ramen.png"
    ),
    ListingImage(
      listing_id= 20,
      image_url = "/images/tonkotsu-ramen-nutrition.png"
    ),
    ListingImage(
      listing_id= 21,
      image_url = "/images/tonkotsu-soupless-ramen.png"
    ),
    ListingImage(
      listing_id= 21,
      image_url = "/images/tonkotsu-soupless-ramen-nutrition.png"
    ),
    ListingImage(
      listing_id= 22,
      image_url = "/images/calpico-strawberry.png"
    ),
    ListingImage(
      listing_id= 22,
      image_url = "/images/calpico-strawberry-nutrition.png"
    ),
    ListingImage(
      listing_id= 23,
      image_url = "/images/chocolate-baum.png"
    ),
    ListingImage(
      listing_id= 23,
      image_url = "/images/chocolate-baum-inside.png"
    ),
    ListingImage(
      listing_id= 23,
      image_url = "/images/chocolate-baum-nutrition.png"
    ),
    ListingImage(
      listing_id= 24,
      image_url = "/images/kimchi-ramen.png"
    ),
    ListingImage(
      listing_id= 24,
      image_url = "/images/kimchi-ramen-nutrition.png"
    ),
    ListingImage(
      listing_id= 25,
      image_url = "/images/garlic-chili-oil.png"
    ),
    ListingImage(
      listing_id= 25,
      image_url = "/images/garlic-chili-oil-sauce.png"
    ),
    ListingImage(
      listing_id= 25,
      image_url = "/images/garlic-chili-oil-nutrition.png"
    ),
    ListingImage(
      listing_id= 26,
      image_url = "/images/sriracha-mayo.png"
    ),
    ListingImage(
      listing_id= 26,
      image_url = "/images/sriracha-mayo-sauce.png"
    ),
    ListingImage(
      listing_id= 26,
      image_url = "/images/sriracha-mayo-nutrition.png"
    ),
    ListingImage(
      listing_id= 27,
      image_url = "/images/okonomi-sauce.png"
    ),
    ListingImage(
      listing_id= 27,
      image_url = "/images/okonomi-sauce-nutrition.png"
    ),
    ListingImage(
      listing_id= 28,
      image_url = "/images/rice-seasoning.png"
    ),
    ListingImage(
      listing_id= 28,
      image_url = "/images/rice-seasoning-inside.png"
    ),
    ListingImage(
      listing_id= 28,
      image_url = "/images/rice-seasoning-nutrition.png"
    ),
    ListingImage(
      listing_id= 29,
      image_url = "/images/toasted-white-sesame.png"
    ),
    ListingImage(
      listing_id= 29,
      image_url = "/images/toasted-white-sesame-inside.png"
    ),
    ListingImage(
      listing_id= 29,
      image_url = "/images/toasted-white-sesame-nutrition.png"
    ),
    ListingImage(
      listing_id= 30,
      image_url = "/images/hondashi.png"
    ),
    ListingImage(
      listing_id= 30,
      image_url = "/images/hondashi-inside.png"
    ),
    ListingImage(
      listing_id= 30,
      image_url = "/images/hondashi-nutrition.png"
    ),
  ]

   for image in listing_images:
       db.session.add(image)

   db.session.commit();




def undo_listing_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.listing_image RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM listing_image"))

    db.session.commit()
