import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./listingcard.css";
import OpenModalButton from "../OpenModalButton";
import DeleteListingModal from "../DeleteListingModal";

function ListingCard({ listing }) {
  const { images, price, owner, id } = listing;
  const { closeModal } = useModal();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const firstImage = images.length !== 0 ? images[0].imageUrl : "https://silverhillsbakery.ca/wp-content/uploads/2019/02/SHB_Canada-FoodGuide_1200x800_BLOG-1200x800-c-default.jpg";

  return (
    <div className="listing-card-container">
      <div onClick={() => history.push(`/listings/view/${id}`)} className="listing-card__upper-half">
        <div style={{backgroundImage: `url(${firstImage})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "100%", height: "200px"}}></div>
        <div className="listing-card__details">
          <p>{listing.name}</p>
          <p className="listing-card__owner">By: {owner.username}</p>
        </div>
      </div>
      <div className="price-and-other">
        <p className="listing-card__price">$ {price}</p>
        {user ? user.id === owner.id ? (
          <div className="listing-card__buttons">
            <Link to={`/listings/${id}`}>
              <i className="fas fa-edit"></i>
            </Link>
            <OpenModalButton
              className="delete-btn"
              buttonText={<i className="fas fa-trash"></i>}
              onItemClick={closeModal}
              modalComponent={<DeleteListingModal listing={listing} id={id} />}
            />
          </div>
        ) : null : null}
      </div>
    </div>
  )
}

export default ListingCard;
