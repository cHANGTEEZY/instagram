import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtGenerator = (user_id) => {
  const payload = {
    user: user_id,
  };

  const secretKey = process.env.jwtSecretKey;

  if (!secretKey) {
    throw new Error("JWT secret key is missing in environment variables.");
  }

  return jwt.sign(payload, secretKey, {
    expiresIn: "10d",
  });
};

export default jwtGenerator;
