import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("Connected to database");
    client.release();
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
}

testConnection();
