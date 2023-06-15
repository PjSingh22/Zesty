import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./listingcard.css";
import { deleteListingThunk } from "../../store/listings";
import OpenModalButton from "../OpenModalButton";
import DeleteListingModal from "../DeleteListingModal";

function ListingCard({ listing }) {
  const { images, name, price, description, owner, id } = listing;
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const firstImage = images.length !== 0 ? images[0].imageUrl : "https://silverhillsbakery.ca/wp-content/uploads/2019/02/SHB_Canada-FoodGuide_1200x800_BLOG-1200x800-c-default.jpg";

  return (
    <div className="listing-card-container">
      <div style={{backgroundImage: `url(${firstImage})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "100%", height: "200px"}}></div>
      <div className="listing-card__details">
        <p>{listing.name}</p>
        <p>$ {price}</p>
        <p>By: {owner.username}</p>
      </div>
      {user ? user.id === owner.id ? (
        <>
          <Link to={`/listings/${id}`}>Edit</Link>
          <OpenModalButton
            className="delete-btn"
            buttonText="Delete"
            onItemClick={closeModal}
            modalComponent={<DeleteListingModal listing={listing} id={id} />}
          />
        </>
      ) : null : null}
    </div>
  )
}

export default ListingCard;
