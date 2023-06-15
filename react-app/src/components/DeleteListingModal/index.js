import { useModal } from "../../context/Modal"
import { useDispatch } from "react-redux";
import { deleteListingThunk } from "../../store/listings";
import { useState } from "react";
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
    <div>
      <h1>Delete this listing?</h1>
      <div>
        {loading ? <p>deleting...</p> : (
          <>
            <button onClick={closeModal}>Cancel</button>
            <button onClick={handleDelete}>Yes</button>
          </>
        )}
      </div>
    </div>
  )
}

export default DeleteListingModal
