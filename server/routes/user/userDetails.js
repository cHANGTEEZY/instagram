import express from "express";
import authorization from "../../middleware/authorization.js";
import { getUserDetails } from "../../controllers/user/getUserDetails.js";
import { userProfileDetails } from "../../controllers/user/userProfileDetails.js";

const router = express.Router();

router.get("/user-detail", authorization, getUserDetails);
router.get("/user-detail/profile-data", authorization, userProfileDetails);

export default router;
