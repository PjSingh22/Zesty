import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useParams, useHistory } from "react-router-dom";
import { editReviewThunk } from "../../store/listings";
import StarRatings from 'react-star-ratings';

function EditReview({ id }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const listing = useSelector(state => state.listings.singleListing);
  const review = listing.reviews.find(review => review.id === id)
  const [context, setContext] = useState(review.context);
  const [rating, setRating] = useState(review.rating);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const review = {
      context,
      rating
    }
    dispatch(editReviewThunk(review, id));
    closeModal();
  }
  return (
    <div className="review-container">
      <h2>edit review</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea placeholder="optional (max characters 255)" value={context} maxLength={255} onChange={e => setContext(e.target.value)}></textarea>
        </label>
        <label>
        <StarRatings
          rating={rating}
          starRatedColor="#ffd700"
          changeRating={e => setRating(e)}
          starSpacing='2px'
          svgIconPath="M63.893,24.277c-0.238-0.711-0.854-1.229-1.595-1.343l-19. 674-3.006L33.809,1.15
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
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default EditReview
