from flask import Blueprint, jsonify, session, request
from app.models import User, db, Listing, ListingImage, Review
from app.forms import ListingForm
from .auth_routes import validation_errors_to_error_messages
from flask_login import current_user, login_user, logout_user, login_required

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/<int:id>', methods=["DELETE"])
def delete_review(id):
    review = Review.query.get(id)

    db.session.delete(review)
    db.session.commit()
    return { "message": "Review succesfully deleted" }
