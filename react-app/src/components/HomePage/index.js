import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllListingsThunk } from "../../store/listings";
import { Link } from "react-router-dom";
import ListingCard from "../ListingCard";
import { populateCartThunk } from "../../store/cart";
import "./homepage.css";
import { getLikesThunk } from "../../store/likes";
import logo from "../Navigation/logo-no-background.png"

function HomePage() {
  const dispatch = useDispatch();
  const listings = useSelector(state => state.listings.listings);
  const user = useSelector(state => state.session.user);
  const listingsArr = Object.values(listings);

  useEffect(() => {
    dispatch(getAllListingsThunk())
  }, [dispatch])

  useEffect(() => {
    return user ? dispatch(getLikesThunk()) :  null
  }, [dispatch])

  useEffect(() => {
    dispatch(populateCartThunk(user ? user.id : 0))
  }, [dispatch])


   if (!listings) return (
    <div className="loading-sprite">
      <img src={logo} alt="logo" />
      <h1>Snacks Loading...</h1>
    </div>
  );
  return (
    <div className="home-page-container">
      <div className="home-page__banner">
        <div className="banner__title">
          <p>Welcome to Zesty!</p>
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
