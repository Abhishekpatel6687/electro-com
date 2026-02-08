import { pool } from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(cors({
  origin: "*", // abhi testing ke liye
}));

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      success: true,
      time: result.rows[0],
    });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/products", productRoutes);


app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
