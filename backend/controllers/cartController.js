import { pool } from "../config/db.js";

export const addToCart = async (req, res) => {
    try {
        const {
            user_id,
            product_id,
            amount,
        } = req.body;

        const existing = await pool.query(
            "SELECT * FROM cart WHERE user_id=$1 AND product_id=$2",
            [user_id, product_id]
        );

        if (existing.rows.length > 0) {
            const updated = await pool.query(
                "UPDATE cart SET amount = $1 WHERE user_id=$2 AND product_id=$3 RETURNING *",
                [amount, user_id, product_id]
            );

            return res.json(updated.rows[0]);
        }

        // 1️⃣ Product insert karo
        const cartResult = await pool.query(
            `INSERT INTO cart 
      (user_id, product_id, amount)
      VALUES ($1,$2,$3)
      RETURNING *`,
            [user_id, product_id, amount]
        );

        const cart = cartResult.rows[0];

        res.status(201).json({
            message: "Cart added successfully ✅",
            cart,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

export const getAddToCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const result = await pool.query(`
SELECT 
  cart.id,
  cart.amount,
  products.name,
  products.stock,
  products.price,
  products.company,
  product_images.image_url
FROM cart
JOIN products 
  ON cart.product_id = products.id
JOIN product_images 
  ON products.id = product_images.product_id
WHERE cart.user_id = $1;
 `, [userId]);

        res.json(result.rows);
    } catch (error) {
        console.error("CART FETCH ERROR:", error);
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

export const updateAddToCart = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount } = req.body;

        const result = await pool.query(
            "UPDATE cart SET amount=$1 WHERE id=$2 RETURNING *",
            [amount, id]
        );

        const update = result.rows[0];
        res.status(201).json({
            message: "Cart update successfully ✅"
        })
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteCartItem = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query("DELETE FROM cart WHERE id=$1", [id]);

        res.json({ message: "Item removed" });
    } catch (err) {
        res.status(500).json(err);
    }
};


export const deleteAllCartItem = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID required" });
        }

        await pool.query("DELETE FROM cart WHERE user_id = $1", [userId]);

        res.status(200).json({ message: "Cart cleared successfully ✅" });
    } catch (err) {
        res.status(500).json(err);
    }
};