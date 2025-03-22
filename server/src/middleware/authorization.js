import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const authorization = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const secretKey = process.env.jwtSecretKey;

    if (!secretKey) {
      return res.status(500).json({ message: "Internal server error" });
    }

    const verifiedToken = jwt.verify(token, secretKey);

    req.userId = {
      id: verifiedToken,
    };

    next();
  } catch (error) {
    console.error(error.message);
    throw new Error("Something went wrong");
  }
};

export default authorization;
