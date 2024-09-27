import { SignInProps } from "@/types";
import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";
import { CustomError } from "../error";

const prisma = new PrismaClient();

export const signInService = async (data: SignInProps) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: data.usernameOrEmail,
          },
          {
            username: data.usernameOrEmail,
          },
        ],
      },
      include: {
        userRole: true,
      },
    });
    if (!user) {
      throw new CustomError("Invalid Credentials", 404, "Sign in Error", true);
    }

    //Invalid Credentials
    return {
      id: user.id,
      role: user.userRole!.roleId,
      username: user.username,
    };
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
