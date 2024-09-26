import { PrismaClient } from "@prisma/client";
import { CustomError } from "../error";
import { EditAdminProps, SignUpProps } from "@/types";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const dashboardCoursesService = async () => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        user: {
          select: {
            username: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        price: true,
      },
    });

    return courses;
  } catch (error) {
    throw error;
  }
};

export const dashboardAdminsService = async () => {
  try {
    const adminRole = await prisma.role.findFirst({
      where: {
        name: "admin",
      },
      select: { id: true },
    });
    if (!adminRole) {
      throw new CustomError("Admin role not found", 404, "role lookup", true);
    }
    const admins = await prisma.user.findMany({
      where: { userRole: { roleId: adminRole.id }, deletedAt: null },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return admins;
  } catch (error) {
    throw error;
  }
};

export const dashboardNewAdminsService = async (adminData: SignUpProps) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username: adminData.username }, { email: adminData.email }],
      },
    });

    if (existingUser?.email === adminData.email) {
      const errors = {
        email: "email already exists.",
      };
      throw new CustomError(
        "User already exists",
        409,
        "user creation",
        true,
        "",
        errors
      );
    } else if (existingUser?.username === adminData.username) {
      const errors = {
        username: "username already exists.",
      };
      throw new CustomError(
        "User already exists",
        409,
        "user creation",
        true,
        "",
        errors
      );
    }
    const hashedPassword = bcrypt.hashSync(adminData.password, 10);
    const newAdmin = await prisma.user.create({
      data: {
        username: adminData.username,
        email: adminData.email,
        passwordHash: hashedPassword,
      },
    });

    const role = await prisma.role.findUnique({
      where: {
        name: "admin",
      },
      select: { id: true },
    });

    if (!role) {
      throw new CustomError("Admin role not found", 404, "role lookup", true);
    }

    await prisma.userRole.create({
      data: {
        userId: newAdmin.id,
        roleId: role.id,
      },
    });

    return {
      username: newAdmin.username,
      id: newAdmin.id,
      email: newAdmin.email,
      createdAt: newAdmin.createdAt,
      updatedAt: newAdmin.updatedAt,
    };
  } catch (error) {
    throw error;
  }
};

export const dashboardEditAdminsService = async (
  id: number,
  adminData: EditAdminProps
) => {
  try {
    const findAdmin = await prisma.user.findFirst({ where: { id: id } });
    if (!findAdmin) {
      throw new CustomError("Admin not found", 404, "admin lookup", true);
    }

    const actualValues: Record<string, string> = {};

    for (const [key, value] of Object.entries(adminData)) {
      if (key in findAdmin) {
        if (value !== findAdmin[key as keyof typeof findAdmin]) {
          actualValues[key] = value;
        }
      }
    }

    if (Object.keys(actualValues).length === 0) {
      throw new CustomError("No changes to update", 400, "admin update", true);
    }
    console.log(actualValues, adminData);
    const newAdmin = await prisma.user.update({
      where: { id: findAdmin.id },
      data: {
        ...actualValues,
        updatedAt: new Date(),
      },
    });

    return {
      username: newAdmin.username,
      id: newAdmin.id,
      email: newAdmin.email,
      createdAt: newAdmin.createdAt,
      updatedAt: newAdmin.updatedAt,
    };
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    console.log(error);
    throw new CustomError(
      "An error occurred while updating the admin",
      500,
      "update admin",
      true
    );
  }
};

export const dashboardOwnersService = async (id: number) => {
  try {
    const ownerRole = await prisma.role.findFirst({
      where: {
        name: "owner",
      },
      select: { id: true },
    });

    if (!ownerRole) {
      throw new CustomError("Owner role not found", 404, "role lookup", true);
    }

    const owners = await prisma.user.findMany({
      where: {
        AND: [{ userRole: { roleId: ownerRole.id } }, { NOT: { id: id } }],
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return owners;
  } catch (error) {
    throw error;
  }
};

export const dashboardMyDataService = async (id: number) => {
  try {
    const ownerData = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });
    if (!ownerData) {
      throw new CustomError("Owner data not found", 404, "Not Found", true);
    }

    return ownerData;
  } catch (error) {
    throw error;
  }
};

export const dashboardDeleteAdminsService = async (ids: number[]) => {
  try {
    const adminRole = await prisma.role.findFirst({
      where: {
        name: "admin",
      },
      select: { id: true },
    });
    if (!adminRole) {
      throw new CustomError("Admin role not found", 404, "role lookup", true);
    }

    const deletionPromises = ids.map(async (id) => {
      const findAdmin = await prisma.user.findUnique({
        where: { id: id, userRole: { roleId: adminRole.id } },
      });

      if (!findAdmin) {
        throw new CustomError(`Admin with ID ${id} not found`, 404, "", true);
      }
      await prisma.user.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });
    });

    await Promise.all(deletionPromises);

    return true;
  } catch (error) {
    throw error;
  }
};
