import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleListingThunk } from "../../store/listings";


function ViewListing() {
  const { id } = useParams()
  const listing = useSelector(state => state.listings.singleListing);
  const dispatch = useDispatch();

  console.log("view listing", listing)
  useEffect(() => {
    dispatch(getSingleListingThunk(id));
  }, [dispatch, id])

  if (!listing) return null
  return (
    <div>
      <h1>view listing {listing.name}</h1>
    </div>
  )
}


export default ViewListing;
