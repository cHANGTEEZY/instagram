import express from "express";
import authorization from "../../middleware/authorization.js";
import { getUserDetails } from "../../controllers/user/getUserDetails.js";

const router = express.Router();

router.get("/user-detail", authorization, getUserDetails);

export default router;
