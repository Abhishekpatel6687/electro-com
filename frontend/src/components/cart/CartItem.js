import React, { useEffect, useState } from "react";
import FormatPrice from "../../Helpers/FormatPrice";
import CartAmountToggle from "../cart/CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import API from "../../services/api";

const CartItem = ({
  id,
  name,
  image_url,
  price,
  stock,
  amount,
  fetchCart,
}) => {
  // ================= LOCAL STATE =================
  const [amountt, setAmount] = useState(amount);
  const [loading, setLoading] = useState(false);

  // ================= SYNC STATE =================
  useEffect(() => {
    setAmount(amount);
  }, [amount]);

  // ================= UPDATE CART =================
  const updateCart = async (newAmount) => {
    try {
      setLoading(true);

      await API.put(`/addToCart/${id}`, {
        amount: newAmount,
      });

      fetchCart();
    } catch (error) {
      console.log("Update cart error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= INCREASE =================
  const setIncrease = async () => {
    if (loading) return;

    if (amountt < stock) {
      const newAmount = amountt + 1;

      setAmount(newAmount);

      await updateCart(newAmount);
    }
  };

  // ================= DECREASE =================
  const setDecrease = async () => {
    if (loading) return;

    if (amountt > 1) {
      const newAmount = amountt - 1;

      setAmount(newAmount);

      await updateCart(newAmount);
    }
  };

  // ================= REMOVE ITEM =================
  const removeItem = async (id) => {
    try {
      setLoading(true);

      await API.delete(`/addToCart/deleteCartItem/${id}`);

      fetchCart();
    } catch (error) {
      console.log("Remove cart item error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-heading grid grid-five-column">
      <div style={{ display: "flex", gap: "1rem" }}>
        <div className="cart-image--name">
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

      {/* ================= PRICE ================= */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </div>

      {/* ================= QUANTITY ================= */}
      <div>
        <CartAmountToggle
          amount={amountt}
          cartId={id}
          setDecrease={setDecrease}
          setIncrease={setIncrease}
        />
      </div>

      {/* ================= SUBTOTAL ================= */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price * amountt} />
        </p>
      </div>

      {/* ================= REMOVE ================= */}
      <div>
        <FaTrash className="remove_icon" onClick={() => removeItem(id)} />
      </div>
    </div>
  );
};

export default CartItem;