import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { cleanUpCartThunk, populateCartThunk } from "../../store/cart";
import Cartitem from "../CartItem";
import "./checkoutpage.css"

function CheckoutPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector(state => state.cart.cart);
  const user = useSelector(state => state.session.user)
  const cartItems = Object.values(cart);
  const [total, setTotal] = useState(0)

  const checkout = async () => {
    await dispatch(cleanUpCartThunk())
    localStorage.setItem(`cart_${user ? user.id : 0}`, JSON.stringify([]));
    history.push("/thanks")
  }

  const clearCart = async () => {
    await dispatch(cleanUpCartThunk())
    localStorage.setItem(`cart_${user ? user.id : 0}`, JSON.stringify([]));
  }

  const cartTotal = (cartItems) => {
    let total = cartItems.reduce((accum, curr) => accum += (curr.price * curr.quantity) , 0);
    return total;
  }

  const subTotal = () => {
    let total = cartTotal(cartItems)
    let tax = cartTotal(cartItems) * .09

    return (total + tax).toFixed(2)
  }

  useEffect(() => {
    dispatch(populateCartThunk(user ? user.id : 0))
  }, [dispatch])

  if (!cartItems.length) return (
  <div className="empty-msg">
    <h1>Cart seems to be empty...</h1>
    <button onClick={() => history.push("/")} className="create-listing">Back To Home</button>
  </div>
  )
  return (
    <div className="checkout-container">
      <div className="cart-items">
        <p>test</p>
        <p className="cart-amount">{cartItems.length} {cartItems.length === 1? "item" : "items"} in your cart.</p>
        <button onClick={clearCart} className="clear-cart">Clear Cart</button>
        {cartItems?.map(item => {
          return <Cartitem cartItem={item} key={item.id} />
        })}
      </div>
      <div className="checkout-details">
        <div className="checkout-total checkout-price">
          <p>Total:</p>
          <p>${cartTotal(cartItems).toFixed(2)}</p>
        </div>
        <div className="checkout-tax checkout-price">
          <p>Tax:</p>
          <p>${(cartTotal(cartItems) * .09).toFixed(2)}</p>
        </div>
        <div className="sub-total checkout-price">
          <p>Subtotal:</p>
          <p>${subTotal()}</p>
        </div>
        <button onClick={checkout}>Checkout</button>
      </div>
    </div>
  )
}

export default CheckoutPage;
