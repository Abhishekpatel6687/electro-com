import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormatPrice from "../../Helpers/FormatPrice";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const loginUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/payment/${loginUser?.id}`
        );
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Wrapper>
      <h2>🧾 My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((item, index) => (
          <div className="order-card" key={index}>
            <img
              src={`http://localhost:8080${item.image_url}`}
              alt={item.name}
            />

            <div className="details">
              <h3>{item.name}</h3>
              <p>Qty: {item.quantity}</p>
              <p><FormatPrice price={item.price} /></p>
              <p className="status">{item.status}</p>
            </div>
          </div>
        ))
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 3rem;
//   background:red;

  h2 {
    margin-bottom: 2rem;
  }

  .order-card {
    display: flex;
    gap: 20px;
    padding: 15px;
    margin-bottom: 15px;
    background: #fff;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    border-radius: 10px;
  }

  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }

  .details {
    display: flex;
    flex-direction: column;
  }

  .status {
    color: green;
    font-weight: bold;
  }
`;

export default OrderList;