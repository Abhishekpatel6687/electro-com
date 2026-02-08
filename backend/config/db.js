import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Render pe PostgreSQL ke liye required
  },
});

pool.connect()
  .then(() => console.log("PostgreSQL connected ✅"))
  .catch(err => console.error("PostgreSQL connection error ❌", err));

// Sample route to test table
app.get("/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM productfilter");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
