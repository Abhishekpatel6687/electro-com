import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

console.log("DB_PASSWORD type:", typeof process.env.DB_PASSWORD);

console.log(
  "DB_PASSWORD value:",
  JSON.stringify(process.env.DB_PASSWORD)
);
// 🔥 DB connection test
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("DB connection error:", err);
  } else {
    console.log("DB connected at:", res.rows[0]);
  }
});

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
