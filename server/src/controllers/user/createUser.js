import { pool } from "../../db.js";
import bcrypt from "bcrypt";

const saltRounds = 12;

export const createUser = async (req, res) => {
  let client;
  console.log("hit");

  try {
    const { username, fullName, email, password } = req.body;

    client = await pool.connect();

    // Check if user already exists
    const userExistsQuery = `
      SELECT user_id FROM users WHERE username = $1 OR email = $2;
    `;
    const { rowCount } = await client.query(userExistsQuery, [username, email]);

    if (rowCount > 0) {
      return res
        .status(400)
        .json({ message: "User with given email or username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const insertUserQuery = `
      INSERT INTO users (user_id, username, email, password, fullname) 
      VALUES (gen_random_uuid(), $1, $2, $3, $4) 
      RETURNING user_id, username, email, fullname, created_at;
    `;
    const { rows } = await client.query(insertUserQuery, [
      username,
      email,
      hashedPassword,
      fullName,
    ]);

    res.status(201).json({ message: "User Created", user: rows[0] });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
    if (client) client.release(); // Ensure client is released
  }
};
