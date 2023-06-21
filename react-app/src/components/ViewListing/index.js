import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteReviewThunk, getSingleListingThunk } from "../../store/listings";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";
import EditReview from "../EditReview";
import CreateReviewModal from "../CreateReviewModal";
import { addItemThunk, populateCartThunk } from "../../store/cart";
import Carousel from "../Carousel";
import "./viewlisting.css"

function ViewListing() {
  const { id } = useParams()
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const listing = useSelector(state => state.listings.singleListing);
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
          <button onClick={addToCart}>Add To Cart</button>
          <p className="info info-desc">{listing?.description}</p>
        </div>
        </div>
        <div className="view-listings__reviews">
          <h2>Reviews</h2>
          {user ?
            <OpenModalButton
            className="create-rev-btn"
            buttonText="Add Review"
            onItemClick={closeModal}
            modalComponent={<CreateReviewModal listing={listing} />}
          />
          :
          null
          }
          {listing?.reviews?.map(review => {
            return (
              <div className="review">
                <h2 className="review-rating">{review.rating}</h2>
                <p className="review-context">{review.context}</p>
                <p className="review-user">{review.username}</p>
                {user ? user.id === review.userId ?
                  <div>
                    <OpenModalButton
                      className="edit-btn"
                      buttonText="Edit"
                      onItemClick={closeModal}
                      modalComponent={ <EditReview id={review.id}/> }
                    />
                    <OpenModalButton
                      className="delete-btn"
                      buttonText="Delete"
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
