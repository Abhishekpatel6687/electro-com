import { pool } from "../../config/db.js";

export const createOrdersTable = async () => {
    await pool.query(`
CREATE TABLE IF NOT EXISTS orders(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  amount INTEGER,
  status TEXT, -- pending / success
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);

    console.log("Orders table ready ✅");
};

export const createOrderItemsTable = async () => {
    await pool.query(`
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER,
  quantity INTEGER,
  price INTEGER
);
`);

    console.log("Order Items table ready ✅");
};
