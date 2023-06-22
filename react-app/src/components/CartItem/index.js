import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { addItemThunk, decrementCountThunk, removeItemThunk } from "../../store/cart";
import "./cartitem.css"

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
      <Link to={`/listings/view/${cartItem.id}`}><div className="cartItem-image" style={{backgroundImage: `url(${images[0].imageUrl})`}}></div></Link>
      <div className="cartItem-details">
        <Link to={`/listings/view/${cartItem.id}`}>
          <p>{name}</p>
        </Link>
        <div className='cartItem-quantity'>
          <button onClick={decrement}>{`<`}</button>
          <p>{count}</p>
          <button onClick={increment}>{`>`}</button>
        </div>
        <button onClick={removeItem}>Remove Item</button>
      </div>
      <p className="cartItem-price">${price}</p>
    </div>
  )
}

export default Cartitem;
