import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


function EditListing() {
  const { id } = useParams()
  const listing = useSelector(state => state.listings.listings[id])
  console.log(listing)

  if (!listing) return <h1>No listing found</h1>;
  return (
    <>
      <h2>Edit Listing</h2>
      <div>
        <form>
          <label>

          </label>
        </form>
      </div>
    </>
  )
}

export default EditListing;
