from flask import Blueprint, jsonify, session, request
from app.models import User, db, Listing, ListingImage
from app.forms import ListingForm
from .auth_routes import validation_errors_to_error_messages
from flask_login import current_user, login_user, logout_user, login_required
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

listing_routes = Blueprint('listings', __name__)

@listing_routes.route("/")
def listings():
    listings = Listing.query.all()
    listings_list = []
    for listing in listings:
        list_item = listing.to_dict()
        total_ratings = 0
        reviews = listing.reviews
        list_item["totalReviews"] = len(reviews)
        if not len(reviews):
            list_item["avgRating"] = 0
        else:
            reviews_list = []
            for review in reviews:
                total_ratings += review.rating

            for review in reviews:
              review_dict = review.to_dict()
              reviewer = User.query.get(review_dict['userId'])
              review_dict['username'] = reviewer.username
              reviews_list.append(review_dict)

            list_item["reviews"] = reviews_list
            list_item["avgRating"] = total_ratings / len(reviews)

        images = listing.images
        owner = User.query.get(list_item["userId"])
        # print("========LIST ITEM========", owner)
        list_item["owner"] = owner.to_dict()
        list_item["images"] = [image.to_dict() for image in images]
        listings_list.append(list_item)

    return listings_list

@listing_routes.route("/search")
def find_listings():
    queryStr = request.args.get("query")

    listings = Listing.query.filter(Listing.name.ilike(f"%{queryStr}%")).all()
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
        list_item["owner"] = owner.to_dict()
        list_item["images"] = [image.to_dict() for image in images]
        listings_list.append(list_item)
    return listings_list


@listing_routes.route("/new", methods=["POST"])
@login_required
def create_listing():
    listing_form = ListingForm()
    listing_form['csrf_token'].data = request.cookies['csrf_token']
    listing = {}

    # err_obj = {}
    if listing_form.validate_on_submit():
        new_listing = Listing(
            name = listing_form.data["name"],
            price = listing_form.data["price"],
            user_id = current_user.id,
            category = listing_form.data["category"],
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
        return { "errors": validation_errors_to_error_messages(listing_form.errors) }, 400

    return listing
# TODO: create route and listener in editlising file and a thunk dispatch to get the single item
@listing_routes.route('/<int:id>')
def single_listing(id):
    listing = Listing.query.get(id)
    if not listing:
        return {"errors": "Listing does not exist"}

    listing_dict = listing.to_dict()

    reviews = listing.reviews

    reviews_list = []

    for review in reviews:
        review_dict = review.to_dict()
        reviewer = User.query.get(review_dict['userId'])
        review_dict['username'] = reviewer.username
        reviews_list.append(review_dict)


    listing_dict["reviews"] = reviews_list
    listing_dict["images"] = [listing.image.to_dict() for listing.image in listing.images]
    owner = User.query.get(listing_dict["userId"])
    listing_dict["owner"] = owner.to_dict()

    return listing_dict

@listing_routes.route('/<int:id>', methods=["PUT"])
def update_listing(id):
    listing = Listing.query.get(id)

    form = ListingForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        listing.name = form.data["name"]
        listing.price = form.data["price"]
        listing.category = form.data["category"]
        listing.description = form.data["description"]

        db.session.commit()
        return listing.to_dict()
    if form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400

@listing_routes.route('/<int:id>', methods=["DELETE"])
def delete_listing(id):
    listing = Listing.query.get(id)

    listing_images = [listing.image.to_dict() for listing.image in listing.images]

    [remove_file_from_s3(listing_image["imageUrl"]) for listing_image in listing_images]

    db.session.delete(listing)
    db.session.commit()
    return {"message": "Listing successfully deleted"}
