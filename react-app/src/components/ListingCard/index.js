import "./listingcard.css"

function ListingCard({ listing }) {
  const firstImage = listing.images[0].image_url
  console.log(firstImage)
  // console.log(listing)
  return (
    <div className="listing-card-container">
      <div style={{backgroundImage: `url(${firstImage})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "100%", height: "300px"}}></div>
      <div className="listing-card__details">

      </div>
    </div>
  )
}

export default ListingCard;
