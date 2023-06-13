from app.models import db, ListingImage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_listing_images():
   listing_images = [
    ListingImage(
      listing_id= 1,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118276901073600555/image.png"
    ),
    ListingImage(
      listing_id= 1,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118277228254461953/12-1_fea8a953-ae9a-4fd0-b6b4-22ec14aa722b.png"
    ),
    ListingImage(
      listing_id= 1,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118278327791267860/images.jpg"
    ),
    ListingImage(
      listing_id= 1,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118278465175695430/s-l400.png"
    ),
    ListingImage(
      listing_id= 2,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118289476368740443/c331cf2cee64c71856bba2aabd75e5e6_640x360.png"
    ),
    ListingImage(
      listing_id= 3,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118290488982782024/BG10063CupNoodleSeafood_400x.webp"
    ),
    ListingImage(
      listing_id= 3,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118291480050671736/CupNoodle_Seafood_004_400x.webp"
    ),
    ListingImage(
      listing_id= 4,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118291230841917630/BG10064CupNoodleCurry_Package_2af9148e-aa54-407d-9c52-88373c2f6c18_400x.webp"
    ),
    ListingImage(
      listing_id= 4,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118291314975461396/CupNoodle_Curry_003_400x.webp"
    ),
    ListingImage(
      listing_id= 5,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118293398168805537/BG10838_600x.webp"
    ),
    ListingImage(
      listing_id= 5,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118293768098033724/BG10838_KitKatCheesecake_003_600x.webp"
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
