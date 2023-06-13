from app.models import db, Listing, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_listings():
   listings = [
      Listing(
          name = "Premium Paprika Powder",
          user_id = 1,
          price = 9.99,
          description = "Experience the rich and vibrant flavor of our premium paprika powder. Sourced from the finest paprika peppers, this high-quality spice adds a delightful depth to your favorite dishes. Whether you're seasoning a hearty stew, marinating meat, or garnishing a salad, our paprika powder is sure to elevate your culinary creations. Discover the perfect balance of smoky, sweet, and slightly spicy notes that make our paprika a must-have in any kitchen.",
      ),
      Listing(
          name="Organic Cinnamon Sticks",
          user_id = 1,
          price=5.99,
          description="Our organic cinnamon sticks are sourced from the finest cinnamon trees, carefully hand-selected for their exceptional quality. Add a warm and aromatic touch to your beverages, desserts, or savory dishes with these flavorful and fragrant cinnamon sticks.",
      ),
      Listing(
          name="Dried Basil Leaves",
          user_id = 2,
          price=3.49,
          description="Enhance the taste of your Italian dishes with our dried basil leaves. Grown and harvested with care, our basil leaves provide a fresh and herbaceous flavor that perfectly complements sauces, soups, and salads.",
      ),
      Listing(
          name="Smoked Paprika",
          user_id = 2,
          price=6.99,
          description="Introduce a smoky and robust flavor to your recipes with our premium smoked paprika. Carefully selected peppers are smoked and ground to perfection, offering a rich and distinctive taste to your marinades, grilled meats, and roasted vegetables.",
      ),
      Listing(
          name="Turmeric Powder",
          user_id = 2,
          price=4.99,
          description="Discover the vibrant and golden hue of our turmeric powder. Known for its antioxidant properties, this spice adds depth and earthiness to curries, rice dishes, smoothies, and more. Embrace the exotic flavors and health benefits of turmeric in your culinary creations.",
      ),
      Listing(
          name="Dried Oregano",
          user_id = 3,
          price=2.99,
          description="Enjoy the authentic taste of Mediterranean cuisine with our dried oregano. Bursting with aromatic and savory notes, our oregano leaves are perfect for seasoning pizzas, pasta sauces, roasted vegetables, and Greek-inspired dishes.",
      ),
      Listing(
          name="Ground Cumin",
          user_id = 3,
          price=3.99,
          description="Elevate your recipes with the warm and earthy flavor of our ground cumin. Commonly used in Middle Eastern, Indian, and Mexican cuisines, this versatile spice enhances the taste of curries, stews, rice dishes, and spice rubs.",
      ),
      Listing(
          name="Rosemary Sprigs",
          user_id = 1,
          price=4.49,
          description="Infuse your dishes with the aromatic essence of rosemary using our fresh rosemary sprigs. With their pine-like fragrance and robust flavor, these sprigs are ideal for seasoning roasted meats, vegetables, potatoes, and bread recipes.",
      ),
      Listing(
          name="Ground Ginger",
          user_id = 1,
          price=3.99,
          description="Add a zing of spiciness and warmth to your recipes with our ground ginger. Derived from the ginger root, this versatile spice is perfect for stir-fries, marinades, baked goods, and herbal teas, providing a distinct and tangy flavor profile.",
      ),
      Listing(
          name="Dried Thyme Leaves",
          user_id = 2,
          price=2.99,
          description="Enhance the taste of your culinary creations with the aromatic touch of dried thyme leaves. Known for its herbaceous and slightly minty flavor, our thyme leaves are perfect for seasoning",
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
