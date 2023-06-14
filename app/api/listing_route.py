from flask import Blueprint, jsonify, session, request
from app.models import User, db, Listing, ListingImage
from app.forms import ListingForm
from flask_login import current_user, login_user, logout_user, login_required

listing_route = Blueprint('listings', __name__)

@listing_route.route("/")
def listings():
    listings = Listing.query.all()

    listings_list = []
    for listing in listings:
        images = listing.images
        list_item = listing.to_dict()

        list_item["images"] = [image.to_dict() for image in images]
        listings_list.append(list_item)

    return listings_list


@listing_route.route("/create")
def create_listing():
    listingForm = ListingForm()
    listingForm['csrf_token'].data = request.cookies['csrf_token']
    listing = {}

    err_obj = {}

    if listingForm.validate_on_submit():
        listing_data = listingForm.data

        print(listing_data)

    return {"message": "success!"}


    # listings_list = []
    # for listing in listings:
    #     the_listing = listing.to_dict()
    #     images = ListingImage.query.filter_by(listing_id = the_listing.id).all()

    #     the_listing["images"] = [image.to_dict() for image in images]

    #     listings_list.append(the_listing)


    # return listings_list
