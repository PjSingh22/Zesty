import { useDispatch, useSelector } from "react-redux";
import "./cartitem.css"
import { useEffect, useState } from "react";
import { addItemThunk, decrementCountThunk, removeItemThunk } from "../../store/cart";

function Cartitem({ cartItem }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const { images, name, price, quantity } = cartItem;
  const [count, setCount] = useState(quantity)

  const isUser = user ? user.id : 0

  const removeItem = async () => {
    await dispatch(removeItemThunk(cartItem, isUser))
  }

  const increment = async () => {
    await dispatch(addItemThunk(cartItem, user ? user.id : 0));
    setCount(count + 1);
  }

  const decrement = async () => {
    await setCount(count - 1);
    if (count === 1) {
      removeItem()
    } else {
      await dispatch(decrementCountThunk(cartItem, isUser));
    }
  }

  return (
    <div className="cartItem-container">
      <div className="cartItem-image" style={{backgroundImage: `url(${images[0].imageUrl})`}}></div>
      <div className="cartItem-details">
        <p>{name}</p>
        <div className='cartItem-quantity'>
          <button onClick={decrement}>{`<`}</button>
          <p>{count}</p>
          <button onClick={increment}>{`>`}</button>
        </div>
        <button onClick={removeItem}>Remove Item</button>
      </div>
      <p className="cartItem-price">{price}</p>
    </div>
  )
}

export default Cartitem;
