import { useModal } from "../../context/Modal"
import { useDispatch } from "react-redux";
import { deleteListingThunk } from "../../store/listings";
import { useState } from "react";
import "./deletelistingmodal.css";

function DeleteListingModal({ listing, id }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    await dispatch(deleteListingThunk(listing, id))

    closeModal()
  }
  return (
    <div className="delete-modal">
      <h1>Delete this listing?</h1>
      {loading ? <p>deleting...</p> : (
        <div>
          <button onClick={closeModal}>No</button>
          <button onClick={handleDelete}>Yes</button>
        </div>
      )}
    </div>
  )
}

export default DeleteListingModal
