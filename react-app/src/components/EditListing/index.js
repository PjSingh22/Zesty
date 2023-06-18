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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);


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
    const errObj = {}

    if (listDesc.trim().length < 10) errObj["listDesc"] = "Description needs to be at least 10 characters long";
    if (listName.trim().length < 3) errObj["listName"] = "Title cannot be empty or less than 3 characters";

    if (Object.values(errObj).length > 0) {
      setErrors(errObj)
      return
    }

    setLoading(true)
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
        <ul>
          {Object.values(errors).map((error, idx) => (
            <li style={{color: "red"}} key={idx}>{error}</li>
          ))}
        </ul>
          <label>
            Title
            <input type="text" minLength={3} maxLength={50} value={listName} onChange={(e) => setListName(e.target.value)}/>
          </label>
          <label>
            Price
            <input type="number" step="0.01" min={1} value={listPrice} onChange={(e) => setListPrice(e.target.value)} />
          </label>
          <label>
            Description
            <textarea type="text" value={listDesc} onChange={(e) => setListDesc(e.target.value)} />
          </label>
          {loading ? <button disabled>posting...</button> : <button type="submit">Edit Post</button>}
        </form>
      </div>
    </>
  )
}

export default EditListing;
