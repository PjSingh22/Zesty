import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleListingThunk } from "../../store/listings";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import "./viewlisting.css"
function ViewListing() {
  const { id } = useParams()
  const listing = useSelector(state => state.listings.singleListing);
  // const images = useSelector(state => state.listings.singleListing.images)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleListingThunk(id));
  }, [dispatch, id])

  if (!listing) return null
  return (
    <div className="view-listing-container">
    <div style={{display: "flex", justifyContent: "space-evenly"}}>
      <div className="view-listing__carousel">
        <CarouselProvider
          // naturalSlideWidth={10}
          // naturalSlideHeight={10}
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
        </CarouselProvider>
      </div>
      <div className="view-listing-info">
        <h2>$ {listing?.price}</h2>
        <p>Free shipping</p>
        <p>Snacks and drinks</p>
        <p>{listing?.owner?.username}</p>
        <p>Category: {listing?.category}</p>
      </div>
      </div>
      <div className="view-listings__reviews">
        <h2>Reviews</h2>
        {listing && listing?.reviews?.map(review => {
          return (<div className="review">
            <h2 className="review-rating">{review.rating}</h2>
            <p className="review-context">{review.context}</p>
            <p className="review-user">{review.username}</p>
          </div>)
        })}
      </div>
    </div>
  )
}


export default ViewListing;
