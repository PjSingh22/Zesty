const POPULATE_CART = "cart/getItems"
const ADD_ITEM = "cart/add"
const DECREMENT_COUNT = "cart/decrement"
const REMOVE_ITEM = "cart/remove"
const CLEAN_UP = "cart/empty"

const cleanUp = () => ({
  type: CLEAN_UP
})

const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item
})

const removeItem = (item) => ({
  type: REMOVE_ITEM,
  payload: item
})

const decrementCount = (item) => ({
  type: DECREMENT_COUNT,
  payload: item
})

const populateCart = (items) => ({
  type: POPULATE_CART,
  payload: items
})

export const cleanUpCartThunk = () => async dispatch => {
  await dispatch(cleanUp());
  return;
}


export const populateCartThunk = (userId) => async dispatch => {
  const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`))

  if (storedCart !== null) {
    await dispatch(populateCart(storedCart))
  } else {
    return [];
  }
}

export const removeItemThunk = (item, userId) => async dispatch => {
  let storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`));

  storedCart = storedCart.filter(cItem => cItem.id !== item.id);

  localStorage.setItem(`cart_${userId}`, JSON.stringify(storedCart));

  dispatch(removeItem(item));
}

export const decrementCountThunk = (item, userId) => async dispatch => {
  const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`));
  const foundItem = storedCart.find(cItem => cItem.id === item.id);

  foundItem.quantity -= 1;

  localStorage.setItem(`cart_${userId}`, JSON.stringify(storedCart));

  await dispatch(decrementCount(item));
}

export const addItemThunk = (item, userId) => async dispatch => {

  const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`))

  if (storedCart === null) {
    const newCart = [item]
    localStorage.setItem(`cart_${userId}`, JSON.stringify(newCart))
    await dispatch(addItem(item))
  } else {
    const cartItems = [...storedCart]
    const existingItem = cartItems.find(cItem => cItem.id === item.id)
    if (existingItem) {
      existingItem.quantity += 1
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems))
    } else {
      cartItems.push(item)
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems))
    }
    await dispatch(addItem(item))
  }
}

const initialState = { cart: {} }

const cartReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_ITEM:
      const cartState = { cart: {...state.cart }}
      const existingItem = cartState.cart[action.payload.id]

      if (existingItem) {
        existingItem.quantity += 1
        return cartState;
      }
      else return { cart: { ...state.cart, [action.payload.id]: action.payload }}

    case POPULATE_CART:
      const popCartState = { cart: {} }
      action.payload.forEach(item => popCartState.cart[item.id] = item)
      return popCartState

    case DECREMENT_COUNT:
      const newCart = { cart: { ...state.cart }}
      const foundItem = newCart.cart[action.payload.id]
      foundItem.quantity -= 1;
      return newCart;

    case REMOVE_ITEM:
      const aCart = { cart: { ...state.cart } }
      delete aCart.cart[action.payload.id]
      return aCart;
    case CLEAN_UP:
      return { cart: {} }
    default:
      return state
  }
}

export default cartReducer
