from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import likes, User, Listing, db

like_routes = Blueprint('likes', __name__)

@like_routes.route("/")
def likes():
  pass

@like_routes.route("/listing/<int:db>", methods=["POST"])
@login_required
def like_a_listing(id):
  user = User.query.get(current_user.id)
  listing = Listing.query.get(id)

  user.likes.append(listing)

  db.session.commit()

  return { "message": "listing added to likes" }

@like_routes.route("/listing/<int:db>", methods=["DELETE"])
@login_required
def remove_liked_listing(id):
  user = User.query.get(current_user.id)
  listing = Listing.query.get(id)

  user.likes.remove(listing)

  db.session.commit()

  return { "message": "listing removed from likes" }
