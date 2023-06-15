import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./listingcard.css";

function ListingCard({ listing }) {
  const { images, name, price, description, owner, id } = listing;
  const user = useSelector(state => state.session.user);
  const firstImage = images[0].image_url;

  return (
    <div className="listing-card-container">
      <div style={{backgroundImage: `url(${firstImage})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "100%", height: "200px"}}></div>
      <div className="listing-card__details">
        <p>{listing.name}</p>
        <p>$ {price}</p>
        <p>By: {owner.username}</p>
      </div>
      {user ? user.id === owner.id ? <Link to={`/listings/${id}`}>Edit</Link> : null : null}
    </div>
  )
}

export default ListingCard;
