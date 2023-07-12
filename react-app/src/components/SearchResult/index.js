import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ListingCard from "../ListingCard";
import "./searchresult.css";
import ErrorPage from "../404Page";

function SearchResult() {
  const history = useHistory();
  const listings = useSelector(state => state.listings.searchResults);
  const listingsArr = Object.values(listings);


  if (!listingsArr.length) return <ErrorPage />
  return (
    <div className="search-page">
        <h1>Snacks Found 🥳</h1>
        <div className="search-results">
          {listingsArr.map(listing => <ListingCard listing={listing} key={listing.id} />)}
        </div>
      </div>
  )
}

export default SearchResult;
