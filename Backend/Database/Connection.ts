import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();




export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5430),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});


pool.on("connect", () => {
  console.log("Connected to Postgres");
});


pool.on("error", (err) => {
  console.error("Unexpected database error", err);
});
