import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteReviewThunk, getSingleListingThunk } from "../../store/listings";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import "./viewlisting.css"
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";
import EditReview from "../EditReview";
import CreateReviewModal from "../CreateReviewModal";
import { addItemThunk } from "../../store/cart";
function ViewListing() {
  const { id } = useParams()
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const listing = useSelector(state => state.listings.singleListing);
  // const images = useSelector(state => state.listings.singleListing.images)

  useEffect(() => {
    dispatch(getSingleListingThunk(id));
  }, [dispatch, id])

  const addToCart = async (e) => {
    e.preventDefault();

    const item = {
      "id": listing.id,
      "name": listing.name,
      "quantity": 1,
      "price": listing.price
    }

    await dispatch(addItemThunk(item, user ? user.id : 0))
  }

  if (!listing) return null
  return (
    <div className="view-listing-container">
    <div style={{display: "flex", justifyContent: "space-evenly"}}>
      <div className="view-listing__carousel">
        {/* <CarouselProvider
          naturalSlideWidth={10}
          naturalSlideHeight={100}
          totalSlides={listing?.images?.length}
          visibleSlides={2}
          step={1}
          infinite
          isIntrinsicHeight
          className="carousel"
        >
          <Slider>
            {listing?.images?.map((image, i) => {
              return <Slide index={i} key={i}><div className="image-slide" style={{backgroundImage: `url(${image.imageUrl})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}></div></Slide>
            })}
          </Slider>
          <div className="carousel-navigation">
            <ButtonBack className="img-btn btn-left">{`<`}</ButtonBack>
            <ButtonNext className="img-btn">{`>`}</ButtonNext>
          </div>
        </CarouselProvider> */}
      </div>
      <div className="view-listing-info">
        <button onClick={addToCart}>Add Item</button>
        <h2>$ {listing?.price}</h2>
        <p>{listing?.name}</p>
        <p>Free shipping</p>
        <p>{listing?.owner?.username}</p>
        <p>Category: {listing?.category}</p>
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
