from flask import Blueprint, jsonify, session, request
from app.models import User, db, Listing, ListingImage
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

listing_route = Blueprint('listings', __name__)

@listing_route.route("/all")
def listings():
    listings = Listing.query.all()

    listings_list = []
    for listing in listings:
        images = listing.images
        list_item = listing.to_dict()

        list_item["images"] = [image.to_dict() for image in images]
        listings_list.append(list_item)

    return listings_list






    # listings_list = []
    # for listing in listings:
    #     the_listing = listing.to_dict()
    #     images = ListingImage.query.filter_by(listing_id = the_listing.id).all()

    #     the_listing["images"] = [image.to_dict() for image in images]

    #     listings_list.append(the_listing)


    # return listings_list
