const CREATE_LISTING = "listings/createListing"

const createListing = (listing) => ({
  type: CREATE_LISTING,
  payload: listing
});


export const createListingThunk = (listing) => async dispatch => {
  console.log("listing", listing);
}

const initialState = { listings: {} }

const listingReducer = (state = initialState, action) => {
  switch(action) {

    default:
      return state
  }
}


export default listingReducer
