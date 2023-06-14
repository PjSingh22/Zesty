const GET_LISTINGS = "listings/all"
const CREATE_LISTING = "listings/createListing"

const getAllListings = (listings) => ({
  type: GET_LISTINGS,
  payload: listings
});

const createListing = (listing) => ({
  type: CREATE_LISTING,
  payload: listing
});


export const getAllListingsThunk = () => async dispatch => {
  const res = await fetch('/api/listings/', {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    let listings = await res.json();
    console.log("RES", listings)
    await dispatch(getAllListings(listings));
    return listings
  }

  if (res.errors) {
    return res
  }
}


export const createListingThunk = (listing) => async dispatch => {
  const res = await fetch('/api/listings/new', {
    method: "POST",
    body: listing
  })

  if (res.ok) {
    let data = res.json()
    await dispatch(createListing(data))
    return data
  }

  if (res.errors) {
    return res
  }
}

const initialState = { listings: {} }

const listingReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_LISTINGS:
      const allListings = { listings: {} }
      action.payload.forEach(listing => allListings.listings[listing.id] = listing);
      return allListings;
    default:
      return state
  }
}


export default listingReducer
