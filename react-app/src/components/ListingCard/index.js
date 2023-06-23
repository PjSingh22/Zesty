import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./listingcard.css";
import OpenModalButton from "../OpenModalButton";
import DeleteListingModal from "../DeleteListingModal";
import StarRatings from 'react-star-ratings';
import { addLikeThunk, deleteLikeThunk } from "../../store/likes";
import { useState } from "react";

function ListingCard({ listing }) {
  const { images, price, owner, id } = listing;
  const { closeModal } = useModal();
  const dispatch = useDispatch()
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const likes = useSelector(state => state.likes)
  const likesObj = Object.values(likes);
  const foundLike = likesObj.find(likedItem => likedItem.id === listing.id);
  const [liked, setLiked] = useState(foundLike ? true : false);
  const firstImage = images.length !== 0 ? images[0].imageUrl : "https://silverhillsbakery.ca/wp-content/uploads/2019/02/SHB_Canada-FoodGuide_1200x800_BLOG-1200x800-c-default.jpg";


  const handleLike = async (e) => {
    if (!liked) {
      await dispatch(addLikeThunk(id, listing))
      setLiked(true);
    } else {
      await dispatch(deleteLikeThunk(id, listing))
      setLiked(false)
    }
  }

  const renderHeart = liked ? <i onClick={handleLike} class="like-card fas fa-heart" style={{color: "red"}}></i> : <i onClick={handleLike} className="like-card far fa-heart"></i>

  return (
    <div className="listing-card-container">
      {user && renderHeart}
      <div onClick={() => history.push(`/listings/view/${id}`)} className="listing-card__upper-half">
        <div style={{backgroundImage: `url(${firstImage})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "100%", height: "200px"}}>
        </div>
        <div className="listing-card__details">
          <p className="listing-card__name">{listing.name}</p>
          { listing.avgRating ?
          <div className="stars">
            <StarRatings
              rating={listing.avgRating}
              starRatedColor="#ffd700"
              starSpacing='2px'
              svgIconPath="M63.893,24.277c-0.238-0.711-0.854-1.229-1.595-1.343l-19.674-3.006L33.809,1.15
                C33.479,0.448,32.773,0,31.998,0s-1.48,0.448-1.811,1.15l-8.815,18.778L1.698,22.935c-0.741,0.113-1.356,0.632-1.595,1.343
                c-0.238,0.71-0.059,1.494,0.465,2.031l14.294,14.657L11.484,61.67c-0.124,0.756,0.195,1.517,0.822,1.957
                c0.344,0.243,0.747,0.366,1.151,0.366c0.332,0,0.666-0.084,0.968-0.25l17.572-9.719l17.572,9.719c0.302,0.166,0.636,0.25,0.968,0.25
                c0.404,0,0.808-0.123,1.151-0.366c0.627-0.44,0.946-1.201,0.822-1.957l-3.378-20.704l14.294-14.657
                C63.951,25.771,64.131,24.987,63.893,24.277z"
              svgIconViewBox='0 0 64 64'
              numberOfStars={5}
              starDimension='15px'
              name='rating'
            />
            <p>{`(${listing.totalReviews})`}</p>
          </div>
          :
          null}
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
