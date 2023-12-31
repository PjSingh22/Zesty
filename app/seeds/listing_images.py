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
    ListingImage(
      listing_id= 13,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1121575478944350208/BG11661_LaysChipsTokoyoYakitori_01_600x.webp"
    ),
    ListingImage(
      listing_id= 13,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1121575478529118300/BG11661_LaysChipsTokoyoYakitori_Texture_600x.webp"
    ),
    ListingImage(
      listing_id= 13,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1121575841609031690/BG11661_LaysChipsTokoyoYakitori_Nutrition_600x.webp"
    ),
    ListingImage(
      listing_id= 14,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1121576395726934036/BG10082GoldenCurrySauceMixMild_600x.webp"
    ),
    ListingImage(
      listing_id= 14,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1121576396175708280/GoldenCurry_MediumHot_003_25de8762-5ec3-4d67-84ff-2b439bc065d1_600x.webp"
    ),
    ListingImage(
      listing_id= 15,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1121578186661175369/BG10195TempuraBatterMixGlutenFree_600x.webp"
    ),
    ListingImage(
      listing_id= 15,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1121578186992521306/BG10195_GlutenFreeTempuraMix_003_Nutrition_600x.webp"
    ),
    ListingImage(
      listing_id= 16,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1121579317336490084/FZ10023_KarageChicken_001_Package_600x.webp"
    ),
    ListingImage(
      listing_id= 16,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1121579317747527852/FZ10023_KarageChicken_003_Nutrition_600x.webp"
    ),
    ListingImage(
      listing_id= 17,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1121579943210528818/BG11328_PockyChocolateBananaCream_001_Package_800x.webp"
    ),
    ListingImage(
      listing_id= 17,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1121579943688675468/BG11328_PockyChocolateBananaCream_002_Texture_600x.webp"
    ),
    ListingImage(
      listing_id= 17,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1121579944099721276/BG11328_PockyChocolateBananaCream_003_Nutrition_600x.webp"
    ),
    ListingImage(
      listing_id= 18,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1121580399290757211/BG11327_PockyCrunchyStrawberry_001_Package_600x.webp"
    ),
    ListingImage(
      listing_id= 18,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1121580399735345252/BG11327_PockyCrunchyStrawberry_002_Texture_600x.webp"
    ),
    ListingImage(
      listing_id= 18,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1121580398892290118/BG11327_PockyCrunchyStrawberry_003_Nutrition_600x.webp"
    ),
    ListingImage(
      listing_id= 19,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1121581020773367849/BG10750SweetandSPicyTopokkiRice_69e96c74-1c84-47df-9a5f-978926b47443_600x.webp"
    ),
    ListingImage(
      listing_id= 19,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1121581021117288611/BG10750SweetandSPicyTopokkiRice2_600x.webp"
    ),
    ListingImage(
      listing_id= 20,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1121581605182513222/BG10268-TonkotsuRamen_600x.webp"
    ),
    ListingImage(
      listing_id= 20,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1121581605559996547/Menraku_TonkotsuRamen_003_600x.webp"
    ),
    ListingImage(
      listing_id= 21,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1121583793233465374/BG10274AburaSobaSoupless_600x.webp"
    ),
    ListingImage(
      listing_id= 21,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1121583792738541608/AburaSobaSoupless_003_600x.webp"
    ),
    ListingImage(
      listing_id= 22,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1121587081454559333/BG10150CalpicoStrawberry_600x.webp"
    ),
    ListingImage(
      listing_id= 22,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1121587081102229534/Calpico_Strawberry_003_600x.webp"
    ),
    ListingImage(
      listing_id= 23,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1122328830837788712/BG10198MiniBaumkuchenChocolate_600x.webp"
    ),
    ListingImage(
      listing_id= 23,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1122328831227854900/MiniBaumkuchen_Chocolate_002_600x.webp"
    ),
    ListingImage(
      listing_id= 23,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1122328831588581386/MiniBaumkuchen_Chocolate_003_600x.webp"
    ),
    ListingImage(
      listing_id= 24,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1122329577637822484/BG10288KimChiRamen_600x.webp"
    ),
    ListingImage(
      listing_id= 24,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1122329577239347210/KimchiRamen_003_600x.webp"
    ),
    ListingImage(
      listing_id= 25,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1122330062436442133/BG10117RaYuChiliOilwithCrunchyGarlic_600x.webp"
    ),
    ListingImage(
      listing_id= 25,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1122330062834909194/CrunchyGarlicChiliOil_002_600x.webp"
    ),
    ListingImage(
      listing_id= 25,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1122330063229161585/CrunchyGarlicChiliOil_003_600x.webp"
    ),
    ListingImage(
      listing_id= 26,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1122330924051337297/BG10103SrirachaMayo_600x.webp"
    ),
    ListingImage(
      listing_id= 26,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1122330924995059783/Kikkoman_SrirachaMayo_002_600x.webp"
    ),
    ListingImage(
      listing_id= 26,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1122330925427069008/Kikkoman_SrirachaMayo_003_600x.webp"
    ),
    ListingImage(
      listing_id= 27,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1122331638827859978/BG10187OtafukuOkonomiSauce_600x.webp"
    ),
    ListingImage(
      listing_id= 27,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1122331639285043251/BG10187_OkonomiSauce_003_Nutrition_600x.webp"
    ),
    ListingImage(
      listing_id= 28,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1122332117074985121/BG10121FurikakeRiceSeasoningSetoFumi_600x.webp"
    ),
    ListingImage(
      listing_id= 28,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1122332117481816095/BG10121-_Seto-Fumi-Furikake-Rice-Seasoning_003_600x.webp"
    ),
    ListingImage(
      listing_id= 28,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1122332117867712562/BG10121_Seto-Fumi-Furikake-Rice-Seasoning_002_600x.webp"
    ),
    ListingImage(
      listing_id= 29,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1122332957944840333/BG10824ToastedWhiteSeasomeSeeds_600x.webp"
    ),
    ListingImage(
      listing_id= 29,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1122332958368473168/BG10824ToastedWhiteSeasomeSeeds3_600x.webp"
    ),
    ListingImage(
      listing_id= 29,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1122332958762729584/BG10824ToastedWhiteSeasomeSeeds2_600x.webp"
    ),
    ListingImage(
      listing_id= 30,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1122333700663804005/BG10330AjinomotoHondashiSoupStock_cd87798b-7b34-4825-afb6-a616929c5491_600x.webp"
    ),
    ListingImage(
      listing_id= 30,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1122333701133586526/BG10330-Hondashi4149-1_600x.webp"
    ),
    ListingImage(
      listing_id= 30,
      image_url = "https://cdn.discordapp.com/attachments/1118265667246882867/1122333701624303616/BG10330-Hondashi4147-1_600x.webp"
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
