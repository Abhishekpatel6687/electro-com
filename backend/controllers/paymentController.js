import { pool } from "../config/db.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// Razorpay instance
const razorpay = new Razorpay({
  key_id: "rzp_test_SkRqeHh72G28fI",
  key_secret: "yBJf7hCbPO7Hg6D9PbuSW5Gk",
});

// 🔹 Create Order
export const createOrder = async (req, res) => {
  try {
    const { amount, userId } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    await pool.query(
      `INSERT INTO orders (user_id, razorpay_order_id, amount, status)
       VALUES ($1, $2, $3, 'pending')`,
      [userId, order.id, amount],
    );

    res.json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

// 🔹 Verify Payment
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", "yBJf7hCbPO7Hg6D9PbuSW5Gk")
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.json({ success: true, message: "Payment Verified ✅" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Payment ❌" });
    }

    // ✅ Order update
    await pool.query(
      `UPDATE orders 
       SET razorpay_payment_id=$1, status='success'
       WHERE razorpay_order_id=$2`,
      [razorpay_payment_id, razorpay_order_id],
    );

    // 🛒 Cart items uthao
    const cartItems = await pool.query(
      `SELECT c.*, p.price 
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id=$1`,
      [userId],
    );

    // 🧾 Order ID nikalo
    const orderRes = await pool.query(
      "SELECT id FROM orders WHERE razorpay_order_id=$1",
      [razorpay_order_id],
    );

    const orderId = orderRes.rows[0].id;
    console.log(orderRes,'orderResorderResorderRes')

    // 📦 order_items me insert

    for (let item of cartItems.rows) {
      await pool.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.product_id, item.amount, item.price],
      );
    }

    // 🧹 Cart clear
    await pool.query("DELETE FROM cart WHERE user_id=$1", [userId]);

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
