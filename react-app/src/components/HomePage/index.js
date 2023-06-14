import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllListingsThunk } from "../../store/listings";
import ListingCard from "../ListingCard";
import "./homepage.css"

function HomePage() {
  const dispatch = useDispatch();
  const listings = useSelector(state => state.listings.listings)
  const listingsArr = Object.values(listings);

  console.log(listingsArr)
  useEffect(() => {
    dispatch(getAllListingsThunk())
  }, [])

  if (!listings) return <p>wtf</p>
  return (
    <div className="home-page">
      <h1>Home Page</h1>
      <div className="home-page__listings">
        {listingsArr.map(listing => <ListingCard listing={listing} />)}
      </div>
    </div>
  )
}


export default HomePage
