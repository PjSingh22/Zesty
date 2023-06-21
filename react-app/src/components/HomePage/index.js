import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllListingsThunk } from "../../store/listings";
import { Link } from "react-router-dom";
import ListingCard from "../ListingCard";
import { populateCartThunk } from "../../store/cart";
import "./homepage.css";

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


  if (!listings) return null;
  return (
    <div className="home-page-container">
      <div className="home-page__banner">
        <div className="banner__title">
          <h2>Welcome to Zesty!</h2>
          <p>Where you will find flavors like no other!</p>
          <div className="links">
          <a href="https://github.com/PjSingh22" target="_blank" rel="noreferrer">
            <i class="fab fa-github fa-lg"></i>
          </a>
          <a href="https://www.linkedin.com/in/prabhjot-singh-software-developer/" target="_blank" rel="noreferrer">
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
          </div>
        </div>
      </div>
      <div className="home-page">
        <div className="home-page__listings">
          {listingsArr.map(listing => <ListingCard listing={listing} key={listing.id} />)}
        </div>
      </div>
    </div>
  )
}


export default HomePage
