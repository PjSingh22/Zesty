const CREATE_LISTING = "listings/createListing"

const createListing = (listing) => ({
  type: CREATE_LISTING,
  payload: listing
});


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
  switch(action) {

    default:
      return state
  }
}


export default listingReducer
