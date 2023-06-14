from flask import Blueprint, jsonify, session, request
from app.models import User, db, Listing, ListingImage
from app.forms import ListingForm
from flask_login import current_user, login_user, logout_user, login_required
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

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


@listing_route.route("/new", methods=["POST"])
def create_listing():
    listing_form = ListingForm()
    listing_form['csrf_token'].data = request.cookies['csrf_token']
    listing = {}

    err_obj = {}
    # print("--------------", listingForm.data)
    if listing_form.validate_on_submit():
        new_listing = Listing(
            name = listing_form.data["name"],
            price = listing_form.data["price"],
            user_id = current_user.id,
            description = listing_form.data["description"]
        )

        db.session.add(new_listing)
        db.session.commit()
        listing = new_listing.to_dict();

        listing["images"] = []
        for image in listing_form.data["images"]:
          image.filename = get_unique_filename(image.filename)
          upload = upload_file_to_s3(image)

          new_image = ListingImage(
              listing_id = listing["id"],
              image_url = upload["url"]
          )

          db.session.add(new_image)
          db.session.commit()

          image_dict = new_image.to_dict()
          listing["images"].append(image_dict)

    if listing_form.errors:
        print("=======ERRORS=======", listing_form.errors);
        return { "errors": listing_form.errors }

    return listing

    # listings_list = []
    # for listing in listings:
    #     the_listing = listing.to_dict()
    #     images = ListingImage.query.filter_by(listing_id = the_listing.id).all()

    #     the_listing["images"] = [image.to_dict() for image in images]

    #     listings_list.append(the_listing)


    # return listings_list
