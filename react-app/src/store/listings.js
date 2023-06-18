const GET_LISTINGS = "listings/all";
const CREATE_LISTING = "listings/createListing";
const GET_SINGLE_LISTING = "listings/singleListing";
const EDIT_LISTING = "listings/editListing";
const DELETE_LISTING = "listings/deleteListing";

const DELETE_REVIEW = "reviews/delete"
const EDIT_REVIEW = "reviews/edit"
const CREATE_REVIEW = "reviews/new"

const createReview = (review) => ({
  type: CREATE_REVIEW,
  payload: review
})

const editReview = (review) => ({
  type: EDIT_REVIEW,
  payload: review
})

const deleteReview = (listingId, id) => ({
  type: DELETE_REVIEW,
  payload: {
    listingId,
    id
  }
})

const deleteListing = (listing) => ({
  type: DELETE_LISTING,
  payload: listing
})

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

export const createReviewThunk = (listingId, review) => async dispatch => {
  const res = await fetch(`/api/reviews/${listingId}`, {
    method: "POST",
    body: review
  });

  if (res.ok) {
    const data = await res.json();
    await dispatch(createReview(data));
    return data
  }

  if (res.errors) {
    return res.json();
  }
}

export const editReviewThunk = (review, reviewId) => async dispatch => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json" },
    body: JSON.stringify(review)
  })

  if (res.ok) {
    const data = await res.json();
    await dispatch(editReview(data))
    return data
  }

  if (res.errors) {
    const errors = await res.json()
    return errors
  }
}

export const deleteReviewThunk = (listingId, id) => async dispatch => {
  const res = await fetch(`/api/reviews/${id}`, {
    method: "DELETE"
  });

  if (res.ok) {
    const response = await res.json();
    await dispatch(deleteReview(listingId, id));
    return response;
  }
}

export const deleteListingThunk = (listing, id) => async dispatch => {
  const res = await fetch(`/api/listings/${id}`, {
    method: "DELETE"
  });

  if (res.ok) {
    const response = await res.json();
    await dispatch(deleteListing(id));
    return response;
  }
}

export const editListingThunk = (listing, id) => async dispatch => {
  const res = await fetch(`/api/listings/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json" },
    body: JSON.stringify(listing)
  });

  if (res.ok) {
    const updatedListing = await res.json();
    await dispatch(editListing(updatedListing));
    return updatedListing;
  }

  if (res.errors) {
    let errors = await res.json();
    return errors;
  }
}

export const getSingleListingThunk = (id) => async dispatch => {
  const res = await fetch(`/api/listings/${id}`)

  if (res.ok) {
    const data = await res.json();
    await dispatch(getSingleListing(data));
    return data;
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
      singleListingState.singleListing.reviews = singleListingState.singleListing.reviews.sort((a,b) => b.id - a.id)
      return singleListingState;
    case DELETE_LISTING:
      const newState = { ...state, listings : { ...state.listings } }
      delete newState.listings[action.payload]
      return newState
    case DELETE_REVIEW:
      const theState = { ...state, singleListing: { ...state.singleListing, reviews: [...state.singleListing.reviews]} }
      const singleListing = theState.singleListing;
      let reviewsList = singleListing.reviews.filter(review => review.id !== action.payload.id)
      singleListing.reviews = reviewsList;
      console.log(reviewsList)
      return theState
    case EDIT_REVIEW:
      return { ...state, singleListing: { ...state.singleListing, reviews: [
        ...state.singleListing.reviews.map(review => {
          if (review.id === action.payload.id) {
            review.context = action.payload.context
            review.rating = action.payload.rating
          }
          return review
        })
      ]}}
    case CREATE_REVIEW:
      const listingState = { ...state, singleListing: { ...state.singleListing }}
      listingState.singleListing.reviews.push(action.payload)
      listingState.singleListing.reviews =  listingState.singleListing.reviews.sort((a, b) => b.id - a.id)
      return listingState;
    default:
      return state
  }
};


export default listingReducer
