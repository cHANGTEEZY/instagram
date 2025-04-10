import express from "express";
import authorization from "../../middleware/authorization.js";
import createPost from "../../controllers/posts/createPost.js";

const router = express.Router();

router.post("/create-post", authorization, createPost);

export default router;
