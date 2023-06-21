import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteReviewThunk, getSingleListingThunk } from "../../store/listings";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";
import EditReview from "../EditReview";
import CreateReviewModal from "../CreateReviewModal";
import { addItemThunk, populateCartThunk } from "../../store/cart";
import StarRatings from 'react-star-ratings';
import Carousel from "../Carousel";
import "./viewlisting.css"

function ViewListing() {
  const { id } = useParams()
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const listing = useSelector(state => state.listings.singleListing);
  const [buttonText, setButtonText] = useState("Add To Cart")
  // const images = useSelector(state => state.listings.singleListing.images)
  const images = listing?.images?.map(image => {
    return {
      "image": image.imageUrl,
      "headerText": null,
      "subText": null
    }
  })

  useEffect(() => {
    dispatch(getSingleListingThunk(id));
  }, [dispatch, id])

  useEffect(() => {
    dispatch(populateCartThunk(user ? user.id : 0))
  }, [dispatch])

  const addToCart = async (e) => {
    e.preventDefault();

    const item = {
      "id": listing.id,
      "name": listing.name,
      "quantity": 1,
      "price": listing.price,
      "images": listing.images
    }

    await dispatch(addItemThunk(item, user ? user.id : 0))
  }

  if (!listing) return null
  return (
    <div className="view-listing-container">
      <div className="view-listing__other">
        <div className="view-listing__carousel">
          <Carousel images={listing.images} />
        </div>
        <div className="view-listing-info">
          <p className="info info-price">${listing?.price}</p>
          <p className="info info-name">{listing?.name}</p>
          <p className="info info-shipping">Free shipping 😉</p>
          <p className="info info-owner">{listing?.owner?.username}</p>
          <p className="info info-cat">Category: {listing?.category}</p>
          <button onClick={addToCart}>{buttonText}</button>
          <p className="info info-desc">{listing?.description}</p>
        </div>
        </div>
        <div className="view-listings__reviews">
          <h2>Reviews</h2>
          {user ?
          <div className="add-review">
            <OpenModalButton
            className="create-rev-btn add-review"
            buttonText="Add Review"
            onItemClick={closeModal}
            modalComponent={<CreateReviewModal listing={listing} />}
          />
          </div>
          :
          null
          }
          {listing?.reviews?.map(review => {
            return (
              <div className="review">
                <StarRatings
                  rating={review.rating}
                  starRatedColor="#ffd700"
                  starSpacing='2px'
                  svgIconPath="M63.893,24.277c-0.238-0.711-0.854-1.229-1.595-1.343l-19.674-3.006L33.809,1.15
                    C33.479,0.448,32.773,0,31.998,0s-1.48,0.448-1.811,1.15l-8.815,18.778L1.698,22.935c-0.741,0.113-1.356,0.632-1.595,1.343
                    c-0.238,0.71-0.059,1.494,0.465,2.031l14.294,14.657L11.484,61.67c-0.124,0.756,0.195,1.517,0.822,1.957
                    c0.344,0.243,0.747,0.366,1.151,0.366c0.332,0,0.666-0.084,0.968-0.25l17.572-9.719l17.572,9.719c0.302,0.166,0.636,0.25,0.968,0.25
                    c0.404,0,0.808-0.123,1.151-0.366c0.627-0.44,0.946-1.201,0.822-1.957l-3.378-20.704l14.294-14.657
                    C63.951,25.771,64.131,24.987,63.893,24.277z"
                  svgIconViewBox='0 0 64 64'
                  numberOfStars={5}
                  starDimension='15px'
                  name='rating'
                />
                {/* <h2 className="review-rating">{review.rating}</h2> */}
                <p className="review-context">{review.context}</p>
                <p className="review-user">- {review.username}</p>
                {user ? user.id === review.userId ?
                  <div className="review-btns">
                    <OpenModalButton
                      className="edit-btn"
                      buttonText={<i className="fas fa-edit fa-lg"></i>}
                      onItemClick={closeModal}
                      modalComponent={ <EditReview id={review.id}/> }
                    />
                    <OpenModalButton
                      className="delete-btn"
                      buttonText={<i className="fas fa-trash fa-lg"></i>}
                      onItemClick={closeModal}
                      modalComponent={<DeleteReviewModal listingId={listing.id} id={review.id} />}
                    />
                  </div>
                : null
                : null
              }
              </div>
            )
          })}
      </div>
    </div>
  )
}


export default ViewListing;
