import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./config/db.js"; // correct path

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(cors());

// PostgreSQL connection test
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.send(`The Database name is: ${result.rows[0].current_database}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database query failed");
  }
});

// server listening
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
