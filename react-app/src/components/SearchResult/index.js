import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ListingCard from "../ListingCard";
import "./searchresult.css";

function SearchResult() {
  const history = useHistory();
  const listings = useSelector(state => state.listings.searchResults);
  const listingsArr = Object.values(listings);


  if (!listingsArr.length) return (
    <div className="empty-msg">
    <h1>Cart seems to be empty...</h1>
    <button onClick={() => history.push("/")} className="create-listing">Back To Home</button>
  </div>
  )
  return (
    <div className="search-page">
        <div className="search-results">
          {listingsArr.map(listing => <ListingCard listing={listing} key={listing.id} />)}
        </div>
      </div>
  )
}

export default SearchResult;
