import { useState } from "react";
import { useDispatch } from "react-redux";
import { createListingThunk } from "../../store/listings";
import { useHistory } from "react-router-dom";

function NewListingForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodImages, setProdImages] = useState([]);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  // TODO: add error handlers

  const clearInputs = () => {
    setProdDesc("");
    setProdImages([]);
    setProdName("");
    setProdPrice("");
    setLoading(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errObj = {}

    if(prodImages.length === 0) errObj["images"] = "At least 1 image is required";

    if (prodDesc.length < 10) errObj["prodDesc"] = "description needs to be at least 10 characters long"

    if (Object.values(errObj).length > 0) {
      setErrors(errObj)
      return
    }

    setLoading(true);
    const listingFormData = new FormData();
    listingFormData.append('name', prodName);
    listingFormData.append('price', prodPrice);
    listingFormData.append('description', prodDesc)

    for (let image of prodImages) {
      listingFormData.append('images', image);
    }

    await dispatch(createListingThunk(listingFormData))

    // if (res.errors !== undefined) {
    //   setErrors(res.errors)
    //   return
    // }

    clearInputs();
    history.push("/")
  }

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length <= 4) {
      setProdImages(selectedFiles);
    } else {
      alert(`Maximum 4 images allowed on a post.`);
      e.target.value = null;
    }
  };

  return (
    <div className="new-listing-container">
      <h2>Create a New Listing</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <ul>
          {Object.values(errors).map((error, idx) => (
            <li style={{color: "red"}} key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          <input required minLength={3} maxLength={50} value={prodName} onChange={e => setProdName(e.target.value)} placeholder="Product Name"></input>
        </label>
        <label>
          <input required type="number" min={1} step="0.01" value={prodPrice} onChange={e => setProdPrice(e.target.value)} placeholder="Product Price"></input>
        </label>
        <label>
          <textarea required value={prodDesc} onChange={e => setProdDesc(e.target.value)} placeholder="Product Description"></textarea>
        </label>
        <label>
          <input type="file" accept="image/*" multiple alt="upload image" onChange={handleImageChange}></input>
        </label>
        {loading ? <button disabled>posting...</button> : <button type="submit">Create Post</button>}
      </form>
    </div>
  )
}


export default NewListingForm;
