import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleListingThunk } from "../../store/listings";


function EditListing() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const listing = useSelector(state => state.listings.singleListing);
  const [listName, setListName] = useState("");
  const [listPrice, setListPrice] = useState("");
  const [listDesc, setListDesc] = useState("");

  setTimeout(() => {
    if (listing) {
      setListName(listing.name)
      setListPrice(listing.price)
      setListDesc(listing.description)
    }
  }, 500);

  useEffect(() => {
    dispatch(getSingleListingThunk(id))
  }, [])

  if (!listing) return <h1>No listing found</h1>;
  return (
    <>
      <h2>Edit Listing</h2>
      <div>
        <form>
          <label>
            Title
            <input type="text" value={listName}/>
          </label>
          <label>
            Price
            <input type="number" value={listPrice} />
          </label>
          <label>
            Description
            <textarea type="text" value={listDesc} />
          </label>
        </form>
      </div>
    </>
  )
}

export default EditListing;
