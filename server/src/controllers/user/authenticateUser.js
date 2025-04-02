import { pool } from "../../db.js";
import bcrypt from "bcrypt";
import jwtGenerator from "../../utils/jwtGenerator.js";

const saltRounds = 12;

export const authenticateUser = async (req, res) => {
  let client;

  try {
    const { usernameOrEmail, password } = req.body;

    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isEmail = emailRegex.test(usernameOrEmail);

    client = await pool.connect();

    // Query to check if user exists
    const userExistQuery = `
      SELECT user_id, username, email, password 
      FROM users 
      WHERE ${isEmail ? "email" : "username"} = $1;
    `;
    const userExistResult = await client.query(userExistQuery, [
      usernameOrEmail,
    ]);

    if (userExistResult.rows.length === 0) {
      return res.status(400).json({
        message: "User with given username or email does not exist",
      });
    }

    const userPassword = userExistResult.rows[0].password;

    // Check if the entered password matches the stored password
    const checkIfPasswordIsCorrect = await bcrypt.compare(
      password,
      userPassword
    );

    if (!checkIfPasswordIsCorrect) {
      return res
        .status(400)
        .json({ message: "The entered password is incorrect" });
    }

    const token = jwtGenerator(userExistResult.rows[0].user_id);

    return res.status(200).json({ message: "Logging in", token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
    if (client) client.release(); // Ensure the client is released back to the pool
  }
};
