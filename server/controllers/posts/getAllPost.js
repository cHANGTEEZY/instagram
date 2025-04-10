import { pool } from "../../db.js";

const getAllPost = async (req, res) => {
  try {
    const query = `
  SELECT 
    u.username,
    p.post_id,
    p.content_url,
    p.description,
    p.location,
    p.created_at
  FROM posts p
  INNER JOIN users u 
  ON u.user_id = p.user_id 
  ORDER BY p.created_at DESC;
`;
    const { rows } = await pool.query(query);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.status(200).json({ data: rows });
  } catch (error) {
    console.error("Error getting posts:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getAllPost;
