import express from "express";
import authorization from "../../middleware/authorization.js";
import { createPost, upload } from "../../controllers/posts/createPost.js";
import getAllPost from "../../controllers/posts/getAllPost.js";

const router = express.Router();

//? route for creating post
router.post("/create-post", authorization, upload.single("file"), createPost);

//? route for getting all post
router.get("/get-all-post", getAllPost);

export default router;
