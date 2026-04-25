import React, { useState } from 'react';
import FormatPrice from "../../Helpers/FormatPrice";
import CartAmountToggle from '../cart/CartAmountToggle';
import { FaTrash } from 'react-icons/fa';
import { useCartContext } from '../../context/Cart_Context';

const CartItem = ({ id, name, image_url, color, price,stock, 
  // amount
 }) => {

  // const { removeItem, setDecrease, setIncrement } = useCartContext();

  const [amount, setAmount] = useState(1)
  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) :setAmount(1);
  }

  const setIncrease = () => {
    amount < stock ? setAmount(amount + 1) : setAmount(stock)
  }

  return (
    <div className='cart-heading grid grid-five-column'>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div className='cart-image--name'>
          <img src={`http://localhost:8080${image_url}`} alt={id} />
        </div>
        <div>
          <p>{name}</p>
          {/* <div className='color-div'>
                <p>color:</p>
                <div className='color-style' style={{backgroundColor:color, color:color}}></div>
            </div> */}
        </div>
      </div>
      {/* Price */}
      <div className='cart-hide'>
        <p>
          <FormatPrice price={price} />
        </p>
      </div>
      {/* Quantity */}
      <div>
        <CartAmountToggle amount={amount} setDecrease={() => setDecrease(id)}
        //  setIncrease={() => setIncrement(id)} 
         />
      </div>

      {/* Subtotal */}
      <div className='cart-hide'>
        <p><FormatPrice price={price * amount} /></p>
      </div>
      <div>
        {/* <FaTrash className='remove_icon' onClick={() => removeItem(id)} /> */}
      </div>
    </div>
  )
}

export default CartItem;
