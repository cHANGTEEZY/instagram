import { pool } from "../../db.js";

export const getUserDetails = async (req, res) => {
  let client;

  try {
    console.log("Here");

    // Extract token (assuming it's stored in req.userId)
    const userId = req.userId; // Ensure this is correctly set by your middleware
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    client = await pool.connect();

    // Fetch user details
    const userDetailsQuery = `
      SELECT user_id, username, email, fullname, created_at 
      FROM users 
      WHERE user_id = $1;
    `;
    const userDetailsResult = await client.query(userDetailsQuery, [userId]);

    if (userDetailsResult.rows.length === 0) {
      return res.status(404).json({ message: "User details not found" });
    }

    console.log("User details:", userDetailsResult.rows[0]);

    // Fetch user profile details
    const userProfileDetailsQuery = `
      SELECT bio, profile_pic_link, birth_date, gender, location 
      FROM profiles 
      WHERE user_id = $1;
    `;
    const userProfileResult = await client.query(userProfileDetailsQuery, [
      userId,
    ]);

    console.log("User profile details:", userProfileResult.rows[0]);

    res.status(200).json({
      userDetails: userDetailsResult.rows[0],
      userProfileDetails: userProfileResult.rows[0] || null, // Return null if no profile exists
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
    if (client) client.release(); // Ensure the client is released back to the pool
  }
};
