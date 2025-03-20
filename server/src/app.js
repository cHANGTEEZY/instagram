import express from "express";
import cors from "cors";

import authentication from "./routes/auth/authentication.js";

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authentication);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
