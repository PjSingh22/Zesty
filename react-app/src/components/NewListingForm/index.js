import { useState } from "react";
import { useDispatch } from "react-redux";
import { createListingThunk } from "../../store/listings";
import { useHistory } from "react-router-dom";
import "./newlistingform.css"

function NewListingForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodImages, setProdImages] = useState([]);
  const [prodCat, setProdCat] = useState("snacks");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const clearInputs = () => {
    setProdDesc("");
    setProdImages([]);
    setProdName("");
    setProdPrice("");
    setProdCat("")
    setLoading(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errObj = {}

    if (prodName.trim().length < 3) errObj["prodName"] = "Title needs a min of 3 characters"
    if (prodDesc.trim().length < 10) errObj["prodDesc"] = "Description needs a min of 10 characters"
    if(prodImages.length === 0) errObj["images"] = "At least 1 image is required";

    if (Object.values(errObj).length > 0) {
      setErrors(errObj)
      return
    }

    setLoading(true);
    const listingFormData = new FormData();
    listingFormData.append('name', prodName);
    listingFormData.append('price', prodPrice);
    listingFormData.append('description', prodDesc);
    listingFormData.append('category', prodCat);

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
    <div className="new-listing-container form-container">
      <h2>Create a New Listing</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <ul>
          {Object.values(errors).map((error, idx) => (
            <li style={{color: "red"}} key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Title
          <input required minLength={3} maxLength={50} value={prodName} onChange={e => setProdName(e.target.value)} placeholder="Product Name (50 characters max)"></input>
        </label>
        <label>
          Price
          <input required type="number" min={1} max={100} step="0.01" value={prodPrice} onChange={e => setProdPrice(e.target.value)} placeholder="Product Price"></input>
        </label>
        <label>
            category:
            <select required value={prodCat} defaultValue="snacks" onChange={e=> setProdCat(e.target.value)}>
              <option value="snacks">snacks</option>
              <option value="soups">soups</option>
              <option value="desserts">desserts</option>
              <option value="drinks">drinks</option>
              <option value="condiments">condiments</option>
            </select>
        </label>
        <label>
          Description
          <textarea required value={prodDesc} maxLength={255} onChange={e => setProdDesc(e.target.value)} placeholder="Product Description (255 characters max)"></textarea>
        </label>
        <label>
          <input className="upload-img" type="file" accept="image/*" multiple alt="upload image" onChange={handleImageChange}></input>
        </label>
        {loading ? <button disabled>posting...</button> : <button className="submit-listing" type="submit">Create Post</button>}
      </form>
    </div>
  )
}


export default NewListingForm;
