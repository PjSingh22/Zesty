import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllListingsThunk } from "../../store/listings";
import ListingCard from "../ListingCard";
import "./homepage.css"

function HomePage() {
  const dispatch = useDispatch();
  const listings = useSelector(state => state.listings.listings)
  const listingsArr = Object.values(listings);

  useEffect(() => {
    dispatch(getAllListingsThunk())
  }, [dispatch])

  if (!listings) return <p>something went wrong...</p>
  return (
    <div className="home-page">
      <div className="home-page__listings">
        {listingsArr.map(listing => <ListingCard listing={listing} key={listing.id} />)}
      </div>
    </div>
  )
}


export default HomePage
