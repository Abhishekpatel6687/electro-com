import { pool } from "./config/db.js";
import express from "express";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// frontend me cookie use krna hai to backend me cors me credentials true krna hoga aur origin me frontend ka url dena hoga.
// app.use(
//   cors({
//     origin: "http://localhost:3000", // frontend ka URL
//     credentials: true,               // ⭐ MUST
//   })
// );

app.use(cors()); // CORS ko globally enable kar diya, specific origin ke bina
app.use(express.json());
app.use(cookieParser());
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
    res.status(500).json({ error: err.message, });

  }
});


// set cookie 

app.get("/", (req, res) => {
  res.cookie("name", "abhishek");
  res.send("done")
});

app.get("/get-cookie", (req, res) => {
  const name = req.cookies.name;
  console.log(req.cookies);
  res.send(name);
});

app.get("/ab", (req, res) => {
  console.log("req.cookies", req.cookies); // ⭐ debug
  res.json(req.cookies);
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
