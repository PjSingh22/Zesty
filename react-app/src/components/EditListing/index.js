import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { editListingThunk, getSingleListingThunk } from "../../store/listings";


function EditListing() {
  const listing = useSelector(state => state.listings.singleListing);
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const [listName, setListName] = useState("");
  const [listPrice, setListPrice] = useState("");
  const [listDesc, setListDesc] = useState("");


  useEffect(() => {
    dispatch(getSingleListingThunk(id))
  }, [dispatch, id])

  useEffect(() => {
    setTimeout(() => {
      if (listing) {
        setListName(listing.name)
        setListPrice(listing.price)
        setListDesc(listing.description)
      }
    }, 100);
  }, [listing])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedListing ={
      "name": listName,
      "price": listPrice,
      "description": listDesc
    }

    await dispatch(editListingThunk(updatedListing, id));

    history.push("/")
  }

  if (listing && listing.errors) return <h2>{listing.errors}</h2>;
  return (
    <>
      <h2>Edit Listing</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input type="text" value={listName} onChange={(e) => setListName(e.target.value)}/>
          </label>
          <label>
            Price
            <input type="number" value={listPrice} onChange={(e) => setListPrice(e.target.value)} />
          </label>
          <label>
            Description
            <textarea type="text" value={listDesc} onChange={(e) => setListDesc(e.target.value)} />
          </label>
          <button type="submit">Edit Post</button>
        </form>
      </div>
    </>
  )
}

export default EditListing;
