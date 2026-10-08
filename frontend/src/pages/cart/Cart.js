import styled from "styled-components";
import CartItem from "../../components/cart/CartItem";
import { NavLink } from "react-router-dom";
import { Button } from "../../styles/Button";
import { useEffect, useState } from "react";
import CartTotal from "../../components/cart/CartTotal";
import OrderList from "../order/orderList";
import API from "../../services/api";

const Cart = () => {
  // Get logged-in user from localStorage
  const loginUser = JSON.parse(localStorage.getItem("user"));

  // Cart state
  const [cartData, setCartData] = useState([]);

  // Active tab
  const [activeTab, setActiveTab] = useState("addToCart");

  // ==============================
  // FETCH CART
  // ==============================
  const fetchCart = async () => {
    // User login nahi hai
    if (!loginUser?.id) {
      setCartData([]);
      return;
    }

    try {
      const res = await API.get(`/addToCart/${loginUser.id}`);

      setCartData(res.data);
    } catch (error) {
      console.log("Error fetching cart:", error);

      // Agar API error aaye
      setCartData([]);
    }
  };

  // ==============================
  // INITIAL CART FETCH
  // ==============================
  useEffect(() => {
    fetchCart();
  }, [loginUser?.id]);

  // ==============================
  // CLEAR CART
  // ==============================
  const clearCart = async () => {
    if (!loginUser?.id) {
      return;
    }

    try {
      await API.delete(
        `/addToCart/deleteAllCartItem/${loginUser.id}`
      );

      // UI se cart empty
      setCartData([]);
    } catch (error) {
      console.log("Error clearing cart:", error);
    }
  };

  // ==============================
  // CHANGE TAB
  // ==============================
  const handleToggleButton = (toggleType) => {
    // User login nahi hai
    if (!loginUser?.id) {
      return;
    }

    // Active tab change
    setActiveTab(toggleType);

    // Cart tab par fresh cart fetch
    if (toggleType === "addToCart") {
      fetchCart();
    }
  };

  return (
  <Wrapper>
    <div className="cart-page">

      {/* PAGE HEADER */}
      <div className="cart-top">
        <div>
          <h1>My Cart</h1>
          <p>Review your items and place your order</p>
        </div>

        {/* CART / ORDER TOGGLE */}
        <div className="toggleButton">
          <button
            className={activeTab === "addToCart" ? "active" : ""}
            onClick={() => handleToggleButton("addToCart")}
          >
            Cart List
          </button>

          <button
            className={activeTab === "orderList" ? "active" : ""}
            onClick={() => handleToggleButton("orderList")}
          >
            Order List
          </button>
        </div>
      </div>

      {/* CART */}
      {activeTab === "addToCart" ? (
        cartData.length === 0 ? (

          <EmptyDiv>
            <div className="empty-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Add some products to your cart and they will appear here.</p>

            <NavLink to="/products">
              <Button>Start Shopping</Button>
            </NavLink>
          </EmptyDiv>

        ) : (

          <div className="cart-layout">

            {/* LEFT SIDE */}
            <div className="cart-left">

              <div className="cart-card">

                <div className="cart-card-header">
                  <div>
                    <h2>Shopping Cart</h2>
                    <span>
                      {cartData.length} item
                      {cartData.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  <button
                    className="clear-btn"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </div>

                {/* TABLE HEADER */}

                <div className="cart-heading grid grid-five-column">
                  <p>Product</p>
                  <p className="cart-hide">Price</p>
                  <p>Quantity</p>
                  <p className="cart-hide">Total</p>
                  <p>Remove</p>
                </div>

                <div className="divider" />

                {/* CART ITEMS */}

                {cartData.map((curElem) => (
                  <CartItem
                    key={curElem.id}
                    {...curElem}
                    fetchCart={fetchCart}
                  />
                ))}

              </div>

              {/* CONTINUE SHOPPING */}

              <div className="continue-shopping">
                <NavLink to="/products">
                  <Button>
                    ← Continue Shopping
                  </Button>
                </NavLink>
              </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="cart-right">
              <CartTotal cartData={cartData} />
            </div>

          </div>
        )

      ) : (

        <div className="order-container">
          <OrderList />
        </div>

      )}

    </div>
  </Wrapper>
);
};

export default Cart;


// ==========================================
// EMPTY CART STYLE
// ==========================================

const EmptyDiv = styled.div`
  min-height: 450px;

  background: #fff;

  border: 1px solid #eeeeee;

  border-radius: 18px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  text-align: center;

  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);

  .empty-icon {
    width: 80px;
    height: 80px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #f1f0ff;

    border-radius: 50%;

    font-size: 3.5rem;

    margin-bottom: 20px;
  }

  h3 {
    margin: 0;

    font-size: 2.5rem;

    font-weight: 700;

    color: #222;
  }

  p {
    margin: 10px 0 25px;

    font-size: 1.4rem;

    color: #888;
  }
`;


// ==========================================
// CART WRAPPER STYLE
// ==========================================

const Wrapper = styled.section`
  min-height: calc(100vh - 80px);
  background: #f7f8fc;
  padding: 50px 0 80px;

  .cart-page {
    width: 92%;
    max-width: 1400px;
    margin: 0 auto;
  }

  /* =========================================
     TOP HEADER
  ========================================= */

  .cart-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 35px;
  }

  .cart-top h1 {
    margin: 0;
    font-size: 3.2rem;
    font-weight: 700;
    color: #151515;
    letter-spacing: -0.5px;
  }

  .cart-top p {
    margin: 8px 0 0;
    color: #777;
    font-size: 1.5rem;
  }

  /* =========================================
     CART / ORDER TOGGLE
  ========================================= */

  .toggleButton {
    display: flex;
    align-items: center;
    gap: 6px;

    background: #e9e9ee;
    padding: 6px;
    border-radius: 50px;
  }

  .toggleButton button {
    border: none;
    outline: none;

    padding: 13px 25px;

    border-radius: 40px;

    background: transparent;

    color: #555;

    font-size: 1.4rem;
    font-weight: 600;

    cursor: pointer;

    transition: all 0.25s ease;
  }

  .toggleButton button:hover {
    color: #2525a8;
  }

  .toggleButton button.active {
    background: #302b9d;
    color: #fff;

    box-shadow: 0 5px 15px rgba(48, 43, 157, 0.25);
  }

  /* =========================================
     CART LAYOUT
  ========================================= */

  .cart-layout {
    display: grid;

    grid-template-columns: minmax(0, 1fr) 360px;

    gap: 30px;

    align-items: start;
  }

  /* =========================================
     CART CARD
  ========================================= */

  .cart-card {
    background: #fff;

    border-radius: 18px;

    padding: 28px;

    box-shadow:
      0 8px 30px rgba(0, 0, 0, 0.06);

    border: 1px solid #eeeeee;
  }

  /* =========================================
     CART CARD HEADER
  ========================================= */

  .cart-card-header {
    display: flex;

    justify-content: space-between;
    align-items: center;

    margin-bottom: 25px;
  }

  .cart-card-header h2 {
    margin: 0;

    font-size: 2.1rem;

    font-weight: 700;

    color: #181818;
  }

  .cart-card-header span {
    display: block;

    margin-top: 5px;

    font-size: 1.3rem;

    color: #888;
  }

  /* =========================================
     CLEAR CART
  ========================================= */

  .clear-btn {
    border: none;

    background: #fff1f0;

    color: #e74c3c;

    padding: 10px 16px;

    border-radius: 8px;

    font-size: 1.3rem;

    font-weight: 600;

    cursor: pointer;

    transition: all 0.2s ease;
  }

  .clear-btn:hover {
    background: #ffe0dd;

    transform: translateY(-1px);
  }

  /* =========================================
     CART HEADING
  ========================================= */

  .grid-five-column {
    display: grid;

    grid-template-columns:
      2.5fr
      1fr
      1.2fr
      1fr
      0.7fr;

    align-items: center;

    text-align: center;
  }

  .cart-heading {
    padding: 10px 0;

    color: #777;

    font-size: 1.3rem;

    font-weight: 600;

    text-transform: uppercase;

    letter-spacing: 0.4px;
  }

  .cart-heading p:first-child {
    text-align: left;
  }

  .divider {
    height: 1px;

    width: 100%;

    background: #eeeeee;

    margin-bottom: 5px;
  }

  /* =========================================
     CART ITEMS
  ========================================= */

  .cart-item {
    padding: 22px 0 !important;

    border-bottom: 1px solid #eeeeee;

    transition: background 0.2s ease;
  }

  .cart-item:last-child {
    border-bottom: none;
  }

  /* =========================================
     PRODUCT IMAGE
  ========================================= */

  .cart-image--name {
    display: flex;

    align-items: center;

    gap: 15px;

    text-align: left;

    min-width: 0;
  }

  .cart-image--name img {
    width: 70px;

    height: 70px;

    object-fit: contain;

    border-radius: 10px;

    background: #f7f7f7;

    padding: 7px;

    flex-shrink: 0;
  }

  .cart-image--name .cart-product-name {
    font-size: 1.5rem;

    font-weight: 600;

    color: #222;
  }

  /* =========================================
     QUANTITY
  ========================================= */

  .amount-toggle {
    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap: 15px;

    background: #f5f5f7;

    border-radius: 8px;

    padding: 5px 9px;
  }

  .amount-toggle button {
    width: 28px;

    height: 28px;

    border: none;

    border-radius: 6px;

    background: #fff;

    color: #222;

    font-size: 1.7rem;

    line-height: 1;

    cursor: pointer;

    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  }

  .amount-toggle button:hover {
    background: #302b9d;

    color: #fff;
  }

  .amount-style {
    font-size: 1.6rem !important;

    font-weight: 600;

    color: #302b9d !important;

    min-width: 20px;

    text-align: center;
  }

  /* =========================================
     REMOVE ICON
  ========================================= */

  .remove_icon {
    font-size: 1.8rem;

    color: #e74c3c;

    cursor: pointer;

    transition: transform 0.2s ease;
  }

  .remove_icon:hover {
    transform: scale(1.15);
  }

  /* =========================================
     CONTINUE SHOPPING
  ========================================= */

  .continue-shopping {
    margin-top: 20px;
  }

  .continue-shopping a {
    text-decoration: none;
  }

  /* =========================================
     CART SUMMARY
  ========================================= */

  .cart-right {
    position: sticky;

    top: 100px;
  }

  .order-total--amount {
    width: 100% !important;

    margin: 0 !important;

    display: block !important;
  }

  .order-total--subdata {
    width: 100%;

    box-sizing: border-box;

    background: #fff;

    border: 1px solid #eeeeee !important;

    border-radius: 18px;

    padding: 28px !important;

    box-shadow:
      0 8px 30px rgba(0, 0, 0, 0.06);

    gap: 0 !important;
  }

  .order-total--subdata h3 {
    margin: 0 0 25px;

    font-size: 2rem;

    font-weight: 700;

    color: #181818;
  }

  .order-total--subdata > div {
    display: flex;

    justify-content: space-between;

    align-items: center;

    padding: 12px 0;

    color: #555;

    font-size: 1.4rem;
  }

  .order-total--subdata > div:last-child {
    margin-top: 10px;

    padding-top: 18px;

    border-top: 1px solid #eeeeee;

    background: transparent !important;

    font-size: 1.7rem;

    font-weight: 700;

    color: #181818;
  }

  .order-total--subdata div p:last-child {
    color: #181818 !important;

    font-weight: 600;
  }

  /* =========================================
     EMPTY CART
  ========================================= */

  @media (max-width: 900px) {
    .cart-layout {
      grid-template-columns: 1fr;
    }

    .cart-right {
      position: static;
    }
  }

  /* =========================================
     TABLET
  ========================================= */

  @media (max-width: 768px) {
    padding: 30px 0 60px;

    .cart-page {
      width: 94%;
    }

    .cart-top {
      flex-direction: column;

      align-items: flex-start;

      gap: 20px;
    }

    .cart-top h1 {
      font-size: 2.7rem;
    }

    .cart-card {
      padding: 20px;
    }

    .cart-hide {
      display: none;
    }

    .grid-five-column {
      grid-template-columns:
        2fr
        1fr
        0.8fr;
    }

    .cart-heading {
      grid-template-columns:
        2fr
        1fr
        0.8fr;
    }

    .cart-card-header {
      align-items: flex-start;

      gap: 15px;
    }
  }

  /* =========================================
     MOBILE
  ========================================= */

  @media (max-width: 520px) {
    .cart-page {
      width: 92%;
    }

    .cart-top h1 {
      font-size: 2.4rem;
    }

    .cart-top p {
      font-size: 1.3rem;
    }

    .toggleButton {
      width: 100%;
    }

    .toggleButton button {
      flex: 1;

      padding: 11px 12px;

      font-size: 1.2rem;
    }

    .cart-card {
      padding: 15px;

      border-radius: 14px;
    }

    .cart-card-header h2 {
      font-size: 1.7rem;
    }

    .clear-btn {
      padding: 8px 11px;

      font-size: 1.1rem;
    }

    .cart-image--name {
      gap: 8px;
    }

    .cart-image--name img {
      width: 50px;

      height: 50px;
    }

    .cart-image--name .cart-product-name {
      font-size: 1.2rem;
    }

    .amount-toggle {
      gap: 7px;

      padding: 3px 5px;
    }

    .amount-toggle button {
      width: 24px;

      height: 24px;

      font-size: 1.4rem;
    }

    .amount-style {
      font-size: 1.4rem !important;
    }

    .remove_icon {
      font-size: 1.5rem;
    }

    .cart-heading {
      font-size: 1rem;
    }

    .order-total--subdata {
      padding: 20px !important;
    }
  }
`;