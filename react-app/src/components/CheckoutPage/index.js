import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { populateCartThunk } from "../../store/cart";
import Cartitem from "../CartItem";
import "./checkoutpage.css"

function CheckoutPage() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const user = useSelector(state => state.session.user)
  const cartItems = Object.values(cart);

  useEffect(() => {
    dispatch(populateCartThunk(user ? user.id : 0))
  }, [dispatch])

  if (!cartItems.length) return <h1 className="empty-msg">Cart seems to be empty...</h1>
  return (
    <div className="checkout-container">
      <div className="cart-items">
      <p>{cartItems.length} in your cart.</p>
        {cartItems?.map(item => {
          return <Cartitem cartItem={item} key={item.id} />
        })}
      </div>
      <div className="checkout-details">
        <div className="checkout-total">
          <p>Total:</p>
          <p>$200.00</p>
        </div>
        <button>Proceed to checkout</button>
      </div>
    </div>
  )
}

export default CheckoutPage;
