import React from 'react';
import FormatPrice from "../Helpers/FormatPrice";
import CartAmountToggle from './CartAmountToggle';
import { FaTrash } from 'react-icons/fa';

const CartItem = ({ id, name, image, color, price, amount }) => {
  const setDecrease = () => {
    // amount > 1 ? setAmount(amount - 1) :setAmount(1);
  }

  const setIncrease = () => {
    // amount < stock ? setAmount(amount + 1) : setAmount(stock)
  }
  return (
    <div className='cart-heading grid grid-five-column'>
     <div className='cart-image--name'>  
        <div>
            <img src={image} alt={id} />
        </div>
        <div>
            <p>{name}</p>
            <div className='color-div'>
                <p>color:</p>
                <div className='color-style' style={{backgroundColor:color, color:color}}></div>
            </div>
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
     <CartAmountToggle amount={amount} setDecrease={setDecrease} setIncrease={setIncrease} />
     </div>

     {/* Subtotal */}
     <div  className='cart-hide'>
      <p><FormatPrice price ={price * amount} /></p>
     </div>
     <div>
      <FaTrash className='remove_icon' />
     </div>
    </div>
  )
}

export default CartItem;
