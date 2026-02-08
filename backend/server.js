import { pool } from "./config/db.js";
import express from "express";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Serve uploads folder correctly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Routes
app.use("/api/products", productRoutes);

app.get("/check-products", async (req, res) => {
  try {
    const r = await pool.query('SELECT * FROM "productfilter"'); // Case-sensitive
    res.json(r.rows);
  } catch (err) {
    console.error("FULL DB ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/check-db", async (req, res) => {
  try {
    const r = await pool.query("SELECT current_database()");
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => res.send("API is running 🚀"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
