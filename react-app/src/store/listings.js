const GET_LISTINGS = "listings/all";
const CREATE_LISTING = "listings/createListing";
const GET_SINGLE_LISTING = "listings/singleListing";
const EDIT_LISTING = "listings/editListing";

const editListing = (listing) => ({
  type: EDIT_LISTING,
  payload: listing
});

const getSingleListing = (listing) => ({
  type: GET_SINGLE_LISTING,
  payload: listing
});

const getAllListings = (listings) => ({
  type: GET_LISTINGS,
  payload: listings
});

const createListing = (listing) => ({
  type: CREATE_LISTING,
  payload: listing
});

export const editListingThunk = (listing, id) => async dispatch => {
  const res = await fetch(`/api/listings/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json" },
    body: JSON.stringify(listing)
  });

  if (res.ok) {
    const updatedListing = await res.json();
    await dispatch(editListing(updatedListing))
    return updatedListing
  }

  if (res.errors) {
    let errors = await res.json();
    return errors
  }
}

export const getSingleListingThunk = (id) => async dispatch => {
  const res = await fetch(`/api/listings/${id}`)

  if (res.ok) {
    const data = await res.json();
    await dispatch(getSingleListing(data))
    return data
  }

  if (res.errors) {
    const errors = await res.json();
    return errors;
  }
};


export const getAllListingsThunk = () => async dispatch => {
  const res = await fetch('/api/listings/', {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    let listings = await res.json();
    await dispatch(getAllListings(listings));
    return listings
  }

  if (res.errors) {
    let errors = await res.json()
    return errors
  }
};


export const createListingThunk = (listing) => async dispatch => {
  const res = await fetch('/api/listings/new', {
    method: "POST",
    body: listing
  })

  if (res.ok) {
    let data = await res.json()
    console.log("DATA RES", data);
    await dispatch(createListing(data))
    return {"message": "success!"}
  }

  if (res.errors) {
    return res
  }
};

const initialState = { listings: {}, singleListing: {} };

const listingReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_LISTINGS:
      const allListings = { listings: {} }
      action.payload.forEach(listing => allListings.listings[listing.id] = listing);
      return allListings;
    case GET_SINGLE_LISTING:
      const singleListingState = { ...state, singleListing: {} }
      singleListingState.singleListing = {...action.payload}
      return singleListingState;
    default:
      return state
  }
};


export default listingReducer
