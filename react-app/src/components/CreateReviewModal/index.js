import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReviewThunk } from "../../store/listings";

function CreateReviewModal({listing}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [context, setContext] = useState("");
  const [rating, setRating] = useState(1);

  const handleSubmit = async(e) => {
    e.preventDefault();

    const reviewFormData = new FormData();
    reviewFormData.append('context', context);
    reviewFormData.append('rating', rating);
    // const review = {
    //   'context': context,
    //   'rating': rating
    // }

    await dispatch(createReviewThunk(listing.id, reviewFormData));
    closeModal();
  }
  return (
    <div>
      <h2>Create Review</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea placeholder="optional (max characters 255)" maxLength={255} value={context} onChange={e => setContext(e.target.value)}></textarea>
        </label>
        <label>
          <input value={rating} type="number" min={1} max={5} onChange={e => setRating(e.target.value)}></input>
        </label>
        <button type="submit">Submit</button>
      </form>

    </div>
  )
}

export default CreateReviewModal;
