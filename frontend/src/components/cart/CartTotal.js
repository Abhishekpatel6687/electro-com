import styled from "styled-components";
import FormatPrice from "../../Helpers/FormatPrice";

const CartTotal = ({ cartData }) => {

    const loginUser = JSON.parse(localStorage.getItem("user"));

    // 🔹 subtotal
    const subtotal = cartData.reduce(
        (acc, item) => acc + item.price * item.amount,
        0
    );

    const gst = subtotal * 0.18;
    const handling = 50;
    const total = subtotal + gst + handling;

    // 🔹 PAYMENT FUNCTION
    //   const handlePayment = async () => {
    //     try {
    //       // ✅ 1. create order
    //       const res = await fetch("http://localhost:8080/api/payment/create-order", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ amount: total }),
    //       });

    //       const order = await res.json();

    //       // ✅ 2. Razorpay options
    //       const options = {
    //         key: "YOUR_KEY_ID", // 🔥 apna key daalo
    //         amount: order.amount,
    //         currency: "INR",
    //         name: "My Store",
    //         description: "Order Payment",
    //         order_id: order.id,

    //         // ✅ 3. SUCCESS HANDLER
    //         handler: async function (response) {
    //           try {
    //             // 🔹 verify payment backend se
    //             const verifyRes = await fetch(
    //               "http://localhost:8080/api/payment/verify-payment",
    //               {
    //                 method: "POST",
    //                 headers: {
    //                   "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(response),
    //               }
    //             );

    //             const data = await verifyRes.json();

    //             if (data.success) {
    //               alert("Payment Successful ✅");

    //               // ✅ 4. CART CLEAR
    //               await fetch(
    //                 `http://localhost:8080/api/addToCart/deleteAllCartItem/${loginUser?.id}`,
    //                 {
    //                   method: "DELETE",
    //                 }
    //               );

    //               // 👉 optional redirect
    //               window.location.href = "/dashboard/cart";
    //             } else {
    //               alert("Payment Verification Failed ❌");
    //             }
    //           } catch (err) {
    //             console.log("Verify Error:", err);
    //           }
    //         },

    //         prefill: {
    //           name: "User",
    //           email: "test@gmail.com",
    //         },

    //         theme: {
    //           color: "#5a4bff",
    //         },
    //       };

    //       // ✅ 5. OPEN PAYMENT
    //       const rzp = new window.Razorpay(options);
    //       rzp.open();

    //     } catch (error) {
    //       console.log("Payment Error:", error);
    //     }
    //   };

    return (
        <Wrapper>
            <div className="box">
                <h3>Cart Summary</h3>

                <div className="row">
                    <p>Subtotal</p>
                    <p><FormatPrice price={subtotal} /></p>
                </div>

                <div className="row">
                    <p>GST (18%)</p>
                    <p><FormatPrice price={gst} /></p>
                </div>

                <div className="row">
                    <p>Handling</p>
                    <p><FormatPrice price={handling} /></p>
                </div>

                <hr />

                <div className="row total">
                    <p>Total</p>
                    <p><FormatPrice price={total} /></p>
                </div>

                {/* <button className="buy-btn" onClick={handlePayment}>
          Proceed to Buy
        </button> */}
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  margin-top: 3rem;

  .box {
    width: 320px;
    padding: 20px;
    background: white;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    border-radius: 10px;
    margin-left: auto;
  }

  .row {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }

  .total {
    font-weight: bold;
    font-size: 18px;
  }

  .buy-btn {
    width: 100%;
    padding: 12px;
    margin-top: 15px;
    background: #5a4bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  .buy-btn:hover {
    background: #3f32d1;
  }
`;

export default CartTotal;