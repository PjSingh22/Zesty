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

  console.log(images)
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
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <div className="view-listing__carousel">
          <Carousel images={listing.images} />
        </div>
        <div className="view-listing-info">
          <h2>$ {listing?.price}</h2>
          <p>{listing?.name}</p>
          <p>Free shipping</p>
          <p>{listing?.owner?.username}</p>
          <p>Category: {listing?.category}</p>
          <button onClick={addToCart}>Add Item</button>
        </div>
        </div>
        <div className="view-listings__reviews">
          <h2>Reviews</h2>
          <OpenModalButton
            className="create-rev-btn"
            buttonText="Add Review"
            onItemClick={closeModal}
            modalComponent={<CreateReviewModal listing={listing} />}
          />
          {listing?.reviews?.map(review => {
            return (
              <div className="review">
                <h2 className="review-rating">{review.rating}</h2>
                <p className="review-context">{review.context}</p>
                <p className="review-user">{review.username}</p>
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
            )
          })}
      </div>
    </div>
  )
}


export default ViewListing;
