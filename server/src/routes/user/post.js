import express from "express";
import authorization from "../../middleware/authorization.js";
import createPost from "../../controllers/posts/createPost.js";
import multer from "multer";

const router = express.Router();

router.post("/create-post", authorization, createPost);

export default router;
