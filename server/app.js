import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authentication from "./routes/auth/authentication.js";
import userDetails from "./routes/user/userDetails.js";
import posts from "./routes/user/post.js";

const app = express();

const corsOptions = {
  origin: ["https://instagram-three-tan.vercel.app"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authentication);
app.use("/api/user", userDetails);
app.use("/api/post", posts);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT ${process.env.PORT}`);
});
