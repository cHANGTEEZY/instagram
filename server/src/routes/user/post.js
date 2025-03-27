import express from "express";
import authorization from "../../middleware/authorization.js";
import createPost from "../../controllers/posts/createPost.js";

const router = express.Router();

router.post("/create-post", createPost);

export default router;
