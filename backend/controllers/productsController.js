import { pool } from "../config/db.js";


export const addProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    // 1️⃣ Product insert
    const productResult = await pool.query(
      `INSERT INTO products (name, price, category)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [name, price, category]
    );

    const productId = productResult.rows[0].id;

    // 2️⃣ Image insert
    const imagePath = `/uploads/products/${req.file.filename}`;

    await pool.query(
      `INSERT INTO product_images (product_id, image_url)
       VALUES ($1, $2)`,
      [productId, imagePath]
    );

    res.status(201).json({
      message: "Product + image added successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// GET ALL PRODUCTS
// export const getAllProducts = async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT
//         p.*,
//         COALESCE(
//           json_agg(
//             json_build_object('url', pi.image_url)
//           ) FILTER (WHERE pi.image_url IS NOT NULL),
//           '[]'
//         ) AS image
//       FROM products p
//       LEFT JOIN product_images pi
//       ON p.id = pi.product_id
//       GROUP BY p.id
//     `);

//     res.json(result.rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

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
