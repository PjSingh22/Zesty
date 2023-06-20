import "./cartitem.css"

function Cartitem({ cartItem }) {
  const { images, name, price, quantity } = cartItem;
  return (
    <div className="cartItem-container">
      <div className="cartItem-image" style={{backgroundImage: `url(${images[0].imageUrl})`}}></div>
      <div className="cartItem-details">
        <p>{name}</p>
        <div className='cartItem-quantity'>
          <button>{`<`}</button>
          <p>{quantity}</p>
          <button>{`>`}</button>
        </div>
      </div>
      <p className="cartItem-price">{price}</p>
    </div>
  )
}

export default Cartitem;
