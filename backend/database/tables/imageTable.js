import { pool } from "../../config/db.js";

export const createProductImagesTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS product_images (
      id SERIAL PRIMARY KEY,
      product_id INTEGER NOT NULL,
      image_url TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
    );
  `);

  console.log("Product images table ready ✅");
};
