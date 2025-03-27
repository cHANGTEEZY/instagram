import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserDetails = async (req, res) => {
  try {
    console.log("Here");
    const token = req.userId.id.user;
    if (!token) {
      throw new Error("No token");
    }

    const userDetails = await prisma.user.findUnique({
      where: { user_id: token },
    });

    console.log("user detail is ", userDetails);

    const userProfileDetails = await prisma.user_Details.findUnique({
      where: {
        user_id: token,
      },
    });

    console.log("User profile details are", userProfileDetails);

    if (!userDetails) {
      res.status(404).json({ message: "User details not found" });
    }

    res.status(200).json({ userDetails });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
    prisma.$disconnect();
  }
};
