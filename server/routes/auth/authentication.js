import express from "express";

import { createUser } from "../../controllers/user/createUser.js";
import { authenticateUser } from "../../controllers/user/authenticateUser.js";

const router = express.Router();

//* signup || create user route
router.post("/signup", createUser);

//* signin || login user route
router.post("/login", authenticateUser);

export default router;
