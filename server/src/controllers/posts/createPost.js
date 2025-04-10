import { pool } from "../../db.js";

const createPost = async (req, res) => {
  const userId = req.userId.id.user;
  console.log("userid is", userId);

  const query = "select * from users where user_id = $1";
  const checkData = await pool.query(query, [userId]);

  const { caption, location } = req.body;

  console.log(caption, location);
};

export default createPost;
