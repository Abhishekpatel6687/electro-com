import React, { useState } from 'react';
import FormatPrice from "../../Helpers/FormatPrice";
import CartAmountToggle from '../cart/CartAmountToggle';
import { FaTrash } from 'react-icons/fa';
import { useCartContext } from '../../context/Cart_Context';
import CartTotal from './CartTotal';

const CartItem = ({ id, name, image_url, color, price, stock,
  amount, fetchCart
}) => {

  // const { removeItem, setDecrease, setIncrement } = useCartContext();

  const [amountt, setAmount] = useState(amount)

  console.log(amountt, stock, "check increment");

  const updateCart = async (newAmount) => {
    await fetch(`http://localhost:8080/api/addToCart/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: newAmount }),
    });

    fetchCart(); // refresh data
  };


  const setIncrease = async () => {

    if (amountt < stock) {
      const newAmount = amountt + 1;
      setAmount(newAmount);
      updateCart(newAmount);
    }
  };


  const setDecrease = async () => {

    if (amountt > 1) {
      const newAmount = amountt - 1;
      setAmount(newAmount);
    }
  };


  const removeItem = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/addToCart/deleteCartItem/${id}`, {
        method: "DELETE",
      });
      fetchCart();
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
          <img src={`http://localhost:8080${image_url}`} alt={id} width={60} />
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
          cartId={id}
          setDecrease={setDecrease}
          setIncrease={setIncrease}
        />
      </div>

      {/* Subtotal */}
      <div className='cart-hide'>
        <p><FormatPrice price={price * amountt} /></p>
      </div>
      <div>
        <FaTrash className='remove_icon' onClick={() => removeItem(id)} />
      </div>
      {/* <div className="cart-container"> */}
      {/* <div className="cart-items"> */}
      {/* cart items list */}
      {/* </div> */}

      {/* <CartTotal cartData={cartData} /> */}
      {/* </div> */}
    </div>
  )
}

export default CartItem;
