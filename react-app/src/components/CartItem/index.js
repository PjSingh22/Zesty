import { useDispatch, useSelector } from "react-redux";
import "./cartitem.css"
import { useEffect, useState } from "react";
import { addItemThunk } from "../../store/cart";

function Cartitem({ cartItem }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const { images, name, price, quantity } = cartItem;
  const [count, setCount] = useState(quantity)

  const increment = async () => {
    await dispatch(addItemThunk(cartItem, user ? user.id : 0));
    setCount(count + 1);
  }

  return (
    <div className="cartItem-container">
      <div className="cartItem-image" style={{backgroundImage: `url(${images[0].imageUrl})`}}></div>
      <div className="cartItem-details">
        <p>{name}</p>
        <div className='cartItem-quantity'>
          <button>{`<`}</button>
          <p>{count}</p>
          <button onClick={increment}>{`>`}</button>
        </div>
        <button>Remove Item</button>
      </div>
      <p className="cartItem-price">{price}</p>
    </div>
  )
}

export default Cartitem;
