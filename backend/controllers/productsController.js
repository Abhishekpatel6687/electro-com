import { pool } from "../config/db.js";


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
      category,
    } = req.body;

    // 1️⃣ Product insert karo
    const productResult = await pool.query(
      `INSERT INTO products 
      (name, company, price, description, stock, stars, reviews, featured, category)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`,
      [
        name,
        company,
        price,
        description,
        stock || 0,
        stars || 0,
        reviews || 0,
        featured || false,
        category,
      ]
    );

    const product = productResult.rows[0];

    // 2️⃣ Image insert karo agar file aayi ho
    if (req.file) {
      const imageUrl = `/uploads/products/${req.file.filename}`;

      await pool.query(
        `INSERT INTO product_images (product_id, image_url)
         VALUES ($1, $2)`,
        [product.id, imageUrl]
      );
    }

    res.status(201).json({
      message: "Product added successfully ✅",
      product,
    });
  } catch (error) {
    console.error(error);
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
          ) FILTER (WHERE pi.image_url IS NOT NULL),
          '[]'
        ) AS images
      FROM products p
      LEFT JOIN product_images pi
      ON p.id = pi.product_id
      GROUP BY p.id
      ORDER BY p.id DESC
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

