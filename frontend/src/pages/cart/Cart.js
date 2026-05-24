import styled from "styled-components";
import CartItem from "../../components/cart/CartItem";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "../../styles/Button";
import { useEffect, useState } from "react";
import CartTotal from "../../components/cart/CartTotal";
import OrderList from "../order/orderList";
import API from "../../services/api";

const Cart = () => {
  const location = useLocation();

  const userCartData = location?.state;

  const loginUser = JSON.parse(localStorage.getItem("user"));

  // Default Cart Tab Open
  const [activeTab, setActiveTab] = useState("addToCart");

  const [cartData, setCartData] = useState(userCartData || []);
  const [loading, setLoading] = useState(false);

  // ================= FETCH CART =================
  const fetchCart = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/addToCart/${loginUser?.id}`);

      setCartData(res?.data || []);
    } catch (error) {
      console.log("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= INITIAL LOAD =================
  useEffect(() => {
    if (loginUser?.id) {
      fetchCart();
    }
  }, []);

  // ================= CLEAR CART =================
  const clearCart = async () => {
    try {
      await API.delete(`/addToCart/deleteAllCartItem/${loginUser?.id}`);

      setCartData([]);
    } catch (error) {
      console.log("Error clearing cart:", error);
    }
  };

  // ================= TOGGLE TAB =================
  const handleToggleButton = async (toggleType) => {
    setActiveTab(toggleType);

    if (toggleType === "addToCart") {
      fetchCart();
    }
  };

  return (
    <Wrapper>
      <div className="container">
        {/* ================= TOP BUTTONS ================= */}
        <div className="buttonContainer">
          <div className="toggleButton">
            <button
              className={`tabBtn ${activeTab === "addToCart" ? "active" : ""}`}
              onClick={() => handleToggleButton("addToCart")}
            >
              Cart List
            </button>

            <button
              className={`tabBtn ${activeTab === "orderList" ? "active" : ""}`}
              onClick={() => handleToggleButton("orderList")}
            >
              Order List
            </button>
          </div>
        </div>

        {/* ================= CART TAB ================= */}
        {activeTab === "addToCart" ? (
          <>
            {loading ? (
              <div className="loading">
                <h2>Loading...</h2>
              </div>
            ) : cartData?.length === 0 ? (
              <EmptyDiv>
                <div>
                  <h3>Your Cart Is Empty</h3>

                  <NavLink to="/products">
                    <Button>Shop Now</Button>
                  </NavLink>
                </div>
              </EmptyDiv>
            ) : (
              <>
                {/* ================= HEADING ================= */}
                <div className="cart_heading grid grid-five-column">
                  <p>Item</p>
                  <p className="cart-hide">Price</p>
                  <p>Quantity</p>
                  <p className="cart-hide">Total</p>
                  <p>Remove</p>
                </div>

                <hr />

                {/* ================= CART ITEMS ================= */}
                <div className="cart-item">
                  {cartData?.map((curElem) => {
                    return (
                      <CartItem
                        key={curElem.id}
                        {...curElem}
                        fetchCart={fetchCart}
                      />
                    );
                  })}
                </div>

                <hr />

                {/* ================= BUTTONS ================= */}
                <div className="cart-two-button">
                  <NavLink to="/products">
                    <Button>Continue Shopping</Button>
                  </NavLink>

                  <Button className="btn-clear" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>

                {/* ================= TOTAL ================= */}
                <CartTotal cartData={cartData} />
              </>
            )}
          </>
        ) : (
          <OrderList />
        )}
      </div>
    </Wrapper>
  );
};

// ================= EMPTY CART =================
const EmptyDiv = styled.div`
  display: grid;
  place-items: center;
  min-height: 50vh;
  text-align: center;

  h3 {
    font-size: 3rem;
    margin-bottom: 2rem;
    color: #222;
  }
`;

// ================= MAIN STYLES =================
const Wrapper = styled.section`
  padding: 4rem 0;

  .buttonContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 3rem;
  }

  .toggleButton {
    background: #f5f5f5;
    padding: 10px;
    border-radius: 50px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .tabBtn {
    border: none;
    outline: none;
    padding: 12px 28px;
    border-radius: 30px;
    background: transparent;
    font-size: 1.6rem;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s ease;
    color: #333;
  }

  .tabBtn.active {
    background: #6254f3;
    color: white;
  }

  .grid-five-column {
    display: grid;
    grid-template-columns: repeat(4, 1fr) 0.3fr;
    text-align: center;
    align-items: center;
    gap: 1rem;
  }

  .cart_heading {
    margin-bottom: 1rem;
    font-weight: 600;
    font-size: 1.6rem;
  }

  hr {
    margin: 1rem 0;
    border: 0.1rem solid #eee;
  }

  .cart-item {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 0;
  }

  .cart-two-button {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .btn-clear {
    background: #e74c3c;
  }
  .amount-style {
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.btn};
  }
  .remove_icon {
    font-size: 1.6rem;
    color: #e74c3c;
    cursor: pointer;
  }

  .loading {
    display: grid;
    place-items: center;
    min-height: 40vh;
  }
  .amount-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  /* ================= MOBILE ================= */

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 2rem 0;

    .grid-five-column {
      grid-template-columns: 1.5fr 1fr 0.5fr;
      gap: 1rem;
    }

    .cart-hide {
      display: none;
    }

    .cart-two-button {
      flex-direction: column;
    }

    .cart-two-button a,
    .cart-two-button button {
      width: 100%;
    }

    .toggleButton {
      width: 100%;
      justify-content: center;
    }

    .tabBtn {
      width: 100%;
    }

    h3 {
      font-size: 2.2rem;
    }
  }
`;

export default Cart;
