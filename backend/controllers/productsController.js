import { pool } from "../config/db.js";


export const addProduct = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, price, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    // product insert
    const productResult = await pool.query(
      `INSERT INTO products (name, price, category)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [name, price, category]
    );

    const productId = productResult.rows[0].id;

    const imagePath = `/uploads/products/${req.file.filename}`;

    // image insert (FIXED)
    await pool.query(
      `INSERT INTO product_images (product_id, image_url)
       VALUES ($1, $2)`,
      [productId, imagePath]
    );

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("ADD PRODUCT ERROR 👉", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};



export const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        p.*,
        COALESCE(
          json_agg(
            json_build_object('url', pi.image_url)
          ),
          '[]'
        ) AS image
      FROM products p
      LEFT JOIN product_images pi
      ON p.id = pi.product_id
      GROUP BY p.id
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("PRODUCT FETCH ERROR:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
