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
      <div className="container">

        {/* ==============================
            CART / ORDER BUTTONS
        ============================== */}

        <div className="buttonContainer">
          <div className="toggleButton">

            {/* CART BUTTON */}
            <div className="btnCard">
              <Button
                onClick={() =>
                  handleToggleButton("addToCart")
                }
              >
                Cart List
              </Button>
            </div>

            {/* ORDER BUTTON */}
            <div className="btnOrder">
              <Button
                onClick={() =>
                  handleToggleButton("orderList")
                }
              >
                Order List
              </Button>
            </div>

          </div>
        </div>

        {/* ==============================
            CART TAB
        ============================== */}

        {activeTab === "addToCart" ? (

          cartData.length === 0 ? (

            // EMPTY CART
            <EmptyDiv>
              <h3>No Item in Cart</h3>
            </EmptyDiv>

          ) : (

            // CART HAS ITEMS
            <>
              {/* CART HEADING */}

              <div className="cart_heading grid grid-five-column">
                <p>Item</p>
                <p className="cart-hide">Price</p>
                <p>Quantity</p>
                <p className="cart-hide">Total</p>
                <p>Remove</p>
              </div>

              <hr />

              {/* CART ITEMS */}

              {cartData.map((curElem) => (
                <CartItem
                  key={curElem.id}
                  {...curElem}
                  fetchCart={fetchCart}
                />
              ))}

              <hr />

              {/* CART BUTTONS */}

              <div className="cart-two-button">

                {/* CONTINUE SHOPPING */}

                <NavLink to="/products">
                  <Button>
                    Continue Shopping
                  </Button>
                </NavLink>

                {/* CLEAR CART */}

                <Button
                  className="btn btn-clear"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>

              </div>

              {/* CART TOTAL */}

              <CartTotal cartData={cartData} />
            </>
          )

        ) : (

          // ==============================
          // ORDER TAB
          // ==============================

          <OrderList />

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
  display: grid;
  place-items: center;
  height: 50vh;

  h3 {
    font-size: 4.2rem;
    text-transform: capitalize;
    font-weight: 300;
  }
`;


// ==========================================
// CART WRAPPER STYLE
// ==========================================

const Wrapper = styled.section`
  padding: 4rem 0;

  /* ==============================
     BUTTON CONTAINER
  ============================== */

  .buttonContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 36px;
  }

  .toggleButton {
    background: gray;
    padding: 16px;
    border-radius: 36px;
    display: flex;
    gap: 12px;
  }

  /* ==============================
     GRID
  ============================== */

  .grid-four-column {
    grid-template-columns: repeat(4, 1fr);
  }

  .grid-five-column {
    grid-template-columns: repeat(4, 1fr) 0.3fr;
    text-align: center;
    align-items: center;
  }

  .cart-heading {
    text-align: center;
  }

  /* ==============================
     HR
  ============================== */

  hr {
    margin-top: 1rem;
  }

  /* ==============================
     CART ITEM
  ============================== */

  .cart-item {
    padding: 3.2rem 0;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  /* ==============================
     USER PROFILE
  ============================== */

  .cart-user--profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 5.4rem;

    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }

    h2 {
      font-size: 2.4rem;
    }
  }

  .cart-user--name {
    text-transform: capitalize;
  }

  /* ==============================
     CART IMAGE + NAME
  ============================== */

  .cart-image--name {
    align-items: center;
    grid-template-columns: 0.4fr 1fr;
    text-transform: capitalize;
    text-align: left;

    img {
      max-width: 5rem;
      height: 5rem;
      object-fit: contain;
      color: transparent;
    }

    .color-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;

      .color-style {
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
      }
    }
  }

  /* ==============================
     CART BUTTONS
  ============================== */

  .cart-two-button {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;

    .btn-clear {
      background-color: #e74c3c;
    }
  }

  /* ==============================
     QUANTITY
  ============================== */

  .amount-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }

  /* ==============================
     REMOVE ICON
  ============================== */

  .remove_icon {
    font-size: 1.6rem;
    color: #e74c3c;
    cursor: pointer;
  }

  /* ==============================
     ORDER TOTAL
  ============================== */

  .order-total--amount {
    width: 100%;
    margin: 4.8rem 0;
    text-transform: capitalize;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    .order-total--subdata {
      border: 0.1rem solid #f0f0f0;

      display: flex;
      flex-direction: column;
      gap: 1.8rem;

      padding: 3.2rem;
    }

    div {
      display: flex;
      gap: 3.2rem;
      justify-content: space-between;
    }

    div:last-child {
      background-color: #fafafa;
    }

    div p:last-child {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.heading};
    }
  }

  /* ==============================
     MOBILE
  ============================== */

  @media (max-width: ${({ theme }) => theme.media.mobile}) {

    .grid-five-column {
      grid-template-columns: 1.5fr 1fr 0.5fr;
    }

    .cart-hide {
      display: none;
    }

    .cart-two-button {
      margin-top: 2rem;

      display: flex;
      justify-content: space-between;

      gap: 2.2rem;
    }

    .order-total--amount {
      width: 100%;

      text-transform: capitalize;

      justify-content: flex-start;
      align-items: flex-start;

      .order-total--subdata {
        width: 100%;

        border: 0.1rem solid #f0f0f0;

        display: flex;
        flex-direction: column;

        gap: 1.8rem;

        padding: 3.2rem;
      }
    }
  }
`;