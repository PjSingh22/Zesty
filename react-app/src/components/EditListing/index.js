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
  const [listCat, setListCat] = useState("");
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
        setListCat(listing.category)
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
      "category": listCat,
      "description": listDesc
    }

    await dispatch(editListingThunk(updatedListing, id));

    history.push(`/listings/view/${listing.id}`)
  }

  if (listing && listing.errors) return <h2>{listing.errors}</h2>;
  return (
    <div className="form-container">
      <h2>Edit Listing</h2>
        <form onSubmit={handleSubmit}>
        <ul>
          {Object.values(errors).map((error, idx) => (
            <li style={{color: "red"}} key={idx}>{error}</li>
          ))}
        </ul>
          <label>
            Title
            <input type="text" minLength={3} maxLength={50} value={listName} onChange={(e) => setListName(e.target.value)} placeholder="Product Name (50 characters max)"/>
          </label>
          <label>
            Price
            <input type="number" step="0.01" min={1} max={100} value={listPrice} onChange={(e) => setListPrice(e.target.value)} />
          </label>
          <label>
            category:
            <select required value={listCat} onChange={e=> setListCat(e.target.value)}>
              <option value="snacks">snacks</option>
              <option value="soups">soups</option>
              <option value="desserts">desserts</option>
              <option value="drinks">drinks</option>
              <option value="condiments">condiments</option>
            </select>
        </label>
          <label>
            Description
            <textarea required maxLength={255} type="text" value={listDesc} onChange={(e) => setListDesc(e.target.value)} placeholder="Product Description (255 characters max)" />
          </label>
          {loading ? <button disabled>posting...</button> : <button type="submit">Edit Post</button>}
        </form>
    </div>
  )
}

export default EditListing;
