import { useState } from "react";
import { useDispatch } from "react-redux";
import { createListingThunk } from "../../store/listings";

function NewListingForm() {
  const dispatch = useDispatch();
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodImages, setProdImages] = useState([]);
  // TODO: add error handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      "name": prodName,
      "price": prodPrice,
      "description": prodDesc,
      "images": prodImages
    }
    // const listingFormData = new FormData();
    // listingFormData.append('name', prodName);
    // listingFormData.append('price', prodPrice);
    // listingFormData.append('description', prodDesc)

    // for (let image of prodImages) {
    //   listingFormData.append('images', image);
    // }

    await dispatch(createListingThunk(formData))

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
        <input required value={prodName} onChange={e => setProdName(e.target.value)} placeholder="Product Name"></input>
        <input required type="number" min={0} step="0.01" value={prodPrice} onChange={e => setProdPrice(e.target.value)} placeholder="Product Price"></input>
        <textarea required value={prodDesc} onChange={e => setProdDesc(e.target.value)} placeholder="Product Description"></textarea>
        <input type="file" accept="image/*" multiple alt="upload image" onChange={handleImageChange}></input>
        <button type="submit">Create Post</button>
      </form>
    </div>
  )
}


export default NewListingForm;
