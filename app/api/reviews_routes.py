from flask import Blueprint, jsonify, session, request
from app.models import User, db, Listing, ListingImage, Review
from app.forms import ListingForm, ReviewForm
from .auth_routes import validation_errors_to_error_messages
from flask_login import current_user, login_user, logout_user, login_required

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:id>', methods=["POST"])
def create_review(id):
    listing = Listing.query.get(id)
    review_form = ReviewForm()
    print("=========REVIEW FORM=========", review_form.data)
    review_form['csrf_token'].data = request.cookies['csrf_token']

    if review_form.validate_on_submit():
        new_review = Review(
            context = review_form.data['context'],
            rating = review_form.data['rating'],
            user_id = current_user.id,
            listing_id = listing.id
        )

        db.session.add(new_review)
        db.session.commit()
        review_dict = new_review.to_dict()
        review_dict['username'] = current_user.username
        return review_dict

    if review_form.errors:
        print(review_form.errors)
        return { "errors": validation_errors_to_error_messages(review_form) }, 400


@review_routes.route('/<int:id>', methods=["DELETE"])
def delete_review(id):
    review = Review.query.get(id)

    db.session.delete(review)
    db.session.commit()
    return { "message": "Review succesfully deleted" }

@review_routes.route('/<int:id>', methods=["PUT"])
def edit_review(id):
    review = Review.query.get(id)

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review.context = form.data["context"]
        review.rating = form.data["rating"]

        db.session.commit()
        return review.to_dict()

    if form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400
