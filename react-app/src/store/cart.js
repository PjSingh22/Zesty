const POPULATE_CART = "cart/getItems"
const ADD_ITEM = "cart/add"

const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item
})

const populateCart = () => ({
  type: POPULATE_CART,
})

export const addItemThunk = (item, userId) => async dispatch => {

  const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`))

  if (storedCart === null) {
    const newCart = [item]
    localStorage.setItem(`cart_${userId}`, JSON.stringify(newCart))
    await dispatch(addItem(item))
  } else {
    // get cart items
    // add new item to cart items
    // check for duplicates, if so then increment count, if not then add new item
    // store new array into local storage
    // dispatch action to add new item to cart
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
    default:
      return state
  }
}

export default cartReducer
