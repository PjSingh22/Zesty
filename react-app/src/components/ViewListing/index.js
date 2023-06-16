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

  console.log("view listing", listing)
  useEffect(() => {
    dispatch(getSingleListingThunk(id));
  }, [dispatch, id])

  if (!listing) return null
  return (
    <div className="view-listing-container">
      <div className="view-listing__carousel">
        <CarouselProvider
          naturalSlideWidth={10}
          naturalSlideHeight={125}
          totalSlides={listing?.images?.length}
          visibleSlides={1}
          step={1}
          infinite
          isIntrinsicHeight
          className="carousel"
        >
          <Slider>
            {listing?.images?.map((image, i) => {
              return <Slide index={i}><div className="image-slide" style={{backgroundImage: `url(${image.imageUrl})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "500px", height: "500px"}}></div></Slide>
            })}
          </Slider>
          <div className="carousel-navigation">
            <ButtonBack className="img-btn">{`<`}</ButtonBack>
            <ButtonNext className="img-btn">{`>`}</ButtonNext>
          </div>
        </CarouselProvider>
      </div>
      <div className="view-listing-info">
        <h2>$ {listing?.price}</h2>
        <p>Free shipping</p>
        <p>Snacks and drinks</p>
        <p>{listing?.owner?.username}</p>
      </div>
    </div>
  )
}


export default ViewListing;
