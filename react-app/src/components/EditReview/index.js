import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

function EditReview({ id }) {
  const listing = useSelector(state => state.listings.singleListing);
  const review = listing.reviews.find(review => review.id === id)
  const [context, setContext] = useState(review.context);
  const [rating, setRating] = useState(review.rating);

  const handleSubmit = async (e) => {
    console.log('clicked');
  }
  return (
    <div>
      <p>edit review</p>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea value={context} onChange={e => setContext(e.target.value)}></textarea>
        </label>
        <label>
          <input type="number" min={1} max={5} value={rating} onChange={e => setRating(e.target.value)}></input>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default EditReview
