from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import likes, User, Listing, db

like_routes = Blueprint('likes', __name__)

@like_routes.route("/")
def likes():
  user = User.query.get(current_user.id)
  listings = user.likes;
  listings_list = []
  for listing in listings:
    list_item = listing.to_dict()
    total_ratings = 0
    reviews = listing.reviews
    list_item["totalReviews"] = len(reviews)
    if not len(reviews):
        list_item["avgRating"] = 0
    else:
        for review in reviews:
            total_ratings += review.rating

        list_item["avgRating"] = total_ratings / len(reviews)

    images = listing.images
    owner = User.query.get(list_item["userId"])
    # print("========LIST ITEM========", owner)
    list_item["owner"] = owner.to_dict()
    list_item["images"] = [image.to_dict() for image in images]
    listings_list.append(list_item)
  # likes_list = [user_like.to_dict() for user_like in user_likes]
  return listings_list

@like_routes.route("/listing/<int:id>", methods=["POST"])
@login_required
def like_a_listing(id):
  user = User.query.get(current_user.id)
  listing = Listing.query.get(id)

  user.likes.append(listing)

  db.session.commit()

  return { "message": "listing added to likes" }

@like_routes.route("/listing/<int:id>", methods=["DELETE"])
@login_required
def remove_liked_listing(id):
  user = User.query.get(current_user.id)
  listing = Listing.query.get(id)

  user.likes.remove(listing)

  db.session.commit()

  return { "message": "listing removed from likes" }
