import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllListingsThunk } from "../../store/listings";
import ListingCard from "../ListingCard";
import "./homepage.css"
import { populateCartThunk } from "../../store/cart";

function HomePage() {
  const dispatch = useDispatch();
  const listings = useSelector(state => state.listings.listings);
  const user = useSelector(state => state.session.user);
  const listingsArr = Object.values(listings);

  useEffect(() => {
    dispatch(getAllListingsThunk())
  }, [dispatch])

useEffect(() => {
    dispatch(populateCartThunk(user ? user.id : 0))
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
