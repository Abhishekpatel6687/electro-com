import React, { useState } from 'react';
import FormatPrice from "../../Helpers/FormatPrice";
import CartAmountToggle from '../cart/CartAmountToggle';
import { FaTrash } from 'react-icons/fa';
import { useCartContext } from '../../context/Cart_Context';

const CartItem = ({ id, name, image_url, color, price, stock,
  amount
}) => {

  // const { removeItem, setDecrease, setIncrement } = useCartContext();

  const [amountt, setAmount] = useState(amount)

  console.log(amountt, stock, "check increment");

  const setDecrease = () => {
    amountt > 1 ? setAmount(amountt - 1) : setAmount(1);
  }

  const setIncrease = () => {
    amountt < stock ? setAmount(amountt + 1) : setAmount(stock)
  }

  const removeItem = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/addToCart/deleteCartItem/${id}`, {
        method: "DELETE",
      });

      // const res = await fetch(`http://localhost:8080/api/addToCart/${loginUser?.id}`);
      // const data = await res.json();
      // setCartData(data); // agar state hai
    } catch (error) {
      console.log("Error clearing cart:", error);
    }
  };

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
        <CartAmountToggle
          amount={amountt}
          setDecrease={setDecrease}
          setIncrease={setIncrease}
        />
      </div>

      {/* Subtotal */}
      <div className='cart-hide'>
        <p><FormatPrice price={price * amount} /></p>
      </div>
      <div>
        <FaTrash className='remove_icon' onClick={() => removeItem(id)} />
      </div>
    </div>
  )
}

export default CartItem;
