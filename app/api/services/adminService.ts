import { PrismaClient } from "@prisma/client";
import { CustomError } from "../error";

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
    const admins = await prisma.user.findMany({
      where: { userRole: { roleId: 2 }, deletedAt: null },
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

export const dashboardDeleteAdminsService = async (ids: number[]) => {
  try {
    const deletionPromises = ids.map(async (id) => {
      const findAdmin = await prisma.user.findUnique({
        where: { id },
        include: {
          courses: true,
          userRole: true,
        },
      });

      if (!findAdmin) {
        throw new CustomError(`Admin with ID ${id} not found`, 404, "", true);
      }

      const currentDate = new Date();

      await prisma.user.update({
        where: { id },
        data: {
          deletedAt: currentDate,
        },
      });
    });

    await Promise.all(deletionPromises);

    return true;
  } catch (error) {
    throw error;
  }
};
export const dashboardOwnersService = async (id: number) => {
  try {
    const owners = await prisma.user.findMany({
      where: {
        AND: [{ userRole: { roleId: 1 } }, { NOT: { id: id } }],
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
