import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwtGenerator from "../../utils/jwtGenerator.js";

const prisma = new PrismaClient();

export const authenticateUser = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const isEmail = emailRegex.test(usernameOrEmail);

    const userExist = await prisma.user.findFirst({
      where: {
        OR: [
          { email: isEmail ? usernameOrEmail : undefined },
          { username: isEmail ? undefined : usernameOrEmail },
        ],
      },
    });

    if (!userExist) {
      return res
        .status(400)
        .json({ message: "User with given username or email does not exist" });
    }

    const userPassword = userExist.password;

    const checkIfPasswordIsCorrect = await bcrypt.compare(
      password,
      userPassword
    );

    if (!checkIfPasswordIsCorrect) {
      return res
        .status(400)
        .json({ message: "The entered password is incorrect" });
    }

    const token = jwtGenerator(userExist.user_id);

    return res.status(200).json({ message: "Logging in", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
    await prisma.$disconnect();
  }
};
