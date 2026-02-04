import {pool} from "../config/db.js";

// ADD PRODUCT
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      company,
      price,
      description,
      stock,
      stars,
      reviews,
      featured,
    } = req.body;

    const imageUrl = req.file
      ? `/uploads/products/${req.file.filename}`
      : null;

    const result = await pool.query(
      `INSERT INTO products 
      (name, company, price, description, stock, stars, reviews, featured, image_url)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`,
      [
        name,
        company,
        price,
        description,
        stock,
        stars,
        reviews,
        featured,
        imageUrl,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
