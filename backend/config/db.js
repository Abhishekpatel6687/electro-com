import pkg from "pg";
import dotenv from "dotenv";

dotenv.config(); 

const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  ssl: process.env.DB_HOST !== "localhost"
    ? { rejectUnauthorized: false }
    : false
});

pool.connect()
  .then(() => console.log("PostgreSQL connected ✅"))
  .catch(err => console.error("PostgreSQL connection error ❌", err));