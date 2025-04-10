import { pool } from "../../db.js";

const getAllUserPosts = async (req, res) => {
  try {
    const userIdDetails = req.userId;
    const userId = userIdDetails.id.user;

    const query = "SELECT * from posts WHERE user_id=$1";
    const { rows } = await pool.query(query, [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Post of given user not found" });
    }

    return res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error.message);
    res.staus(500).json({ message: error.message || "Internal server error" });
  }
};

export default getAllUserPosts;
