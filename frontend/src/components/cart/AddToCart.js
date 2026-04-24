import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import CartAmountToggle from "./CartAmountToggle";
import { json, NavLink,useNavigate } from "react-router-dom";
import { Button } from "../../styles/Button";
import { useCartContext } from "../../context/Cart_Context";

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();
  const navigate = useNavigate()
  const { id,
    //  colors, 
    stock } = product;
  // const [color, setColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    amount < stock ? setAmount(amount + 1) : setAmount(stock);
  };

  const loginUser = JSON.parse(localStorage.getItem("user"));

  const handleSubmitAddToCart = async (id,
    // color, 
    amount, product) => {

    await fetch("http://localhost:8080/api/addToCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: loginUser?.id,
        product_id: id,
        amount,
      }),
    });


    const getAddToCardData = await fetch(`http://localhost:8080/api/addToCart/${loginUser.id}`, {
      method: "GET",
    });
    const ff = await getAddToCardData.json()
    console.log(ff, 'jjj')
    const loginUserRole = loginUser.role;
    console.log(loginUser,'hhh')

    if(loginUserRole){
      if(loginUserRole == "superadmin"){
          navigate("/prodashboard/cart")
      }else{
          navigate("/dashboard/cart")
      }
    }else{
      navigate("/login")
    }
    // const finalCartData = {
    //   ...product,   // pura product data
    //   amount: amount  // amount override/add
    // };

    // console.log(finalCartData, "finalCartData ✅");
  }

  return (
    <Wrapper>
      <div className="colors">
        <p>
          colors:
          {/* {colors.map((curColor, index) => {
            return (
              <button
                key={index}
                style={{ backgroundColor: curColor }}
                className={color === curColor ? "btnStyle active" : "btnStyle"}
                onClick={() => setColor(curColor)}
              >
                {" "}
                {color === curColor ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })} */}
        </p>
      </div>

      {/* add to cart  */}

      <CartAmountToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />
      {/* <NavLink to="/prodashboard/cart" onClick={() => AddToCart(id,  */}
      {/* <NavLink  onClick={() => handleSubmitAddToCartid,
        // color, 
        amount, product)}> */}
      <Button onClick={() => handleSubmitAddToCart(id,
        // color, 
        amount, product)} className="btn">Add To Cart</Button>
      {/* </NavLink> */}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
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
`;
export default AddToCart;
