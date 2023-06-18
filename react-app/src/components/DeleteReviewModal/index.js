import { useModal } from "../../context/Modal"
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteReviewThunk } from "../../store/listings";

function DeleteReviewModal({listingId, id}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await dispatch(deleteReviewThunk(listingId, id));

    closeModal();
  }

  return (
    <div>
      <h1>Delete this review?</h1>
      { loading ? <p>deleting</p> : (
        <div>
          <button onClick={closeModal}>Cancel</button>
          <button onClick={handleDelete}>Yes</button>
        </div>
      )}
    </div>
  )
}

export default DeleteReviewModal
