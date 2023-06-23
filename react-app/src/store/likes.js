const GET_LIKES = "likes/all"
const ADD_LIKE = "likes/add"
const DELETE_LIKE = "likes/delete"

const deleteLike = (listing) => ({
  type: DELETE_LIKE,
  payload: listing
})

const addLike = (listing) => ({
  type: ADD_LIKE,
  payload: listing
})

const getLikes = (likes) => ({
  type: GET_LIKES,
  payload: likes
})

export const deleteLikeThunk = (listingId, listing) => async dispatch => {
  const res = await fetch(`/api/likes/listing/${listingId}`, {
    method: "DELETE"
  })

  if (res.ok) {
    const data = await res.json();
    await dispatch(deleteLike(listing))
    return data
  }
}

export const addLikeThunk = (listingId, listing) => async dispatch => {
  const res = await fetch(`/api/likes/listing/${listingId}`, {
    method: "POST",
  })

  if (res.ok) {
    const data = await res.json()
    await dispatch(addLike(listing))
    return data
  }
}

export const getLikesThunk = () => async dispatch => {
  const res = await fetch("/api/likes/");

  if (res.ok) {
    const likes = await res.json();
    await dispatch(getLikes(likes))
  }
}


const initialState = {}

const likesReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_LIKES:
      return {...action.payload}
    case ADD_LIKE:
      return { ...state, ...action.payload}
    case DELETE_LIKE:
      const likes = { ...state }
      const filtered = Object.values(likes).filter(like => like.id !== action.payload.id);
      return { ...filtered }
    default:
      return state
  }
}

export default likesReducer;
