import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const saltRounds = 12;

export const createUser = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;

    const userExists = await prisma.user_details.findFirst({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });

    if (userExists) {
      return res
        .status(400)
        .json({ message: "User with given email or username already exists" });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createNewUser = await prisma.user_details.create({
      data: {
        username,
        email,
        password: hashedPassword,
        fullname: fullName,
      },
    });

    res.status(201).json({ message: "User Created", user: createNewUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
    await prisma.$disconnect();
  }
};
