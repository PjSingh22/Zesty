import { useEffect, useState } from "react"
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
  }, [])

  if (!listings) return <p>something went wrong...</p>
  return (
    <div className="home-page">
      <div className="home-page__listings">
        {listingsArr.map(listing => <ListingCard listing={listing} />)}
      </div>
    </div>
  )
}


export default HomePage
