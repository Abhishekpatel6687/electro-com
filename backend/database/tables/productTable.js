import { pool } from "../../config/db.js";

export const createProductsTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      price NUMERIC(10,2) NOT NULL,
      description TEXT,
      stock INTEGER DEFAULT 0,
      stars NUMERIC(2,1) DEFAULT 0,
      reviews INTEGER DEFAULT 0,
      featured BOOLEAN DEFAULT false,
      category VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("Products table ready ✅");
};
