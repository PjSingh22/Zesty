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
    ListingImage(
      listing_id= 6,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118382610352181328/BG10053StrawberryDaifukuMochi_f94108f1-9cd2-47d2-b395-c5448255a323_600x.webp"
    ),
    ListingImage(
      listing_id= 6,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118382610712907776/BG10053_StrawberryDaifukuMochi_600x.webp"
    ),
    ListingImage(
      listing_id= 7,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118383163220164648/BG10534_Daifuku-Mochi-Sesame_600x.webp"
    ),
    ListingImage(
      listing_id= 7,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118383163660582973/BG10534_Daifuku-Mochi-Sesame0208_600x.webp"
    ),
    ListingImage(
      listing_id= 8,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118383756634493028/BG10001OiOchaGreenTea_c004fde1-394a-4eeb-a5a5-5b422e23f50d_800x.webp"
    ),
    ListingImage(
      listing_id= 8,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118383757116850216/BG10001-UNsweetened-Green-TeaBokksu9018_600x.webp"
    ),
    ListingImage(
      listing_id= 9,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118386261569310813/BG10147QooOrange_600x.webp"
    ),
    ListingImage(
      listing_id= 9,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118386262060060762/QooOrange_Nutrition_600x.webp"
    ),
    ListingImage(
      listing_id= 10,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118387589884420116/BG10098JapaneseMayonnaiseOriginalTube_Package_600x.webp"
    ),
    ListingImage(
      listing_id= 10,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118387590270292089/Kewpie_JapaneseMayonnaise_003_600x.webp"
    ),
    ListingImage(
      listing_id= 11,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118554800590688278/BG10845_OhyamaFoodsYuzuHotSauce_001_Package_0b1163ed-a371-438a-b245-3d7dae24b5f7_600x.webp"
    ),
    ListingImage(
      listing_id= 12,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118559682106236998/BG11141-Japanese-Ramen-Hot-MisoBokksu221090_600x.webp"
    ),
    ListingImage(
      listing_id= 12,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1118559682500493342/BG11141JapaneseRamenHotMisoBokksu221092_600x.webp"
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
