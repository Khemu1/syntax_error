import { PrismaClient } from "@prisma/client";
import { CustomError } from "../error";
import { CourseModel, EditAdminProps, SignUpProps } from "@/types";
import bcrypt from "bcrypt";
import { deleteImgur, uploadToImgur } from "./imgurServices";

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
export const dashboardAllCourseDataService = async (id: number) => {
  try {
    if (isNaN(id) || id === 0) {
      throw new CustomError("invalid course id", 404, "", true);
    }
    const course = await prisma.course.findUniqueOrThrow({
      where: { id: +id, deletedAt: null },
      include: { urlData: true },
    });

    if (!course.urlData) {
      throw new CustomError(
        "course not images",
        404,
        "",
        true,
        "image object is missing"
      );
    }
    const courseImage = course.urlData.find((url) => url.type === "course");
    const mindmapImage = course.urlData.find((url) => url.type === "mindmap");
    if (!courseImage || !mindmapImage) {
      throw new CustomError(
        "course not images",
        404,
        "",
        true,
        "one of the images is missing"
      );
    }
    return {
      id: course.id,
      title: course.title,
      price: course.price,
      totalSessions: course.totalSessions,
      totalSessionPerWeek: course.totalSessionPerWeek,
      totalTasks: course.totalTasks,
      courseInfo: course.courseInfo,
      instructorAndMentorInfo: course.instructorAndMentorInfo,
      courseImage: courseImage.url,
      mindmapImage: mindmapImage.url,
    };
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error;
  }
};

export const dashboardEditCourseService = async (
  id: number,
  courseData: Record<string, string | number | object>
) => {
  try {
    const findCourse = await prisma.course.findFirst({
      where: { id },
      include: { urlData: true },
    });

    if (!findCourse) {
      throw new CustomError("Course not found", 404, "course lookup", true);
    }

    const hasFiles = ["courseImage", "mindmapImage"].filter(
      (key) => courseData[key]
    );

    // Determine actual values to update
    const actualValues = Object.entries(courseData).reduce(
      (acc, [key, value]) => {
        if (
          key in findCourse &&
          value !== findCourse[key as keyof typeof findCourse]
        ) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, string | number | object>
    );

    if (Object.keys(actualValues).length === 0 && hasFiles.length === 0) {
      throw new CustomError("No changes to update", 400, "admin update", true);
    }

    let updatedCourse;
    // Update course details if there are changes
    if (Object.keys(actualValues).length > 0) {
      updatedCourse = await prisma.course.update({
        where: { id: findCourse.id },
        data: {
          ...actualValues,
          updatedAt: new Date(),
        },
        select: {
          id: true,
          title: true,
          price: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }

    if (hasFiles.length > 0) {
      hasFiles.forEach((type) => {
        if (type === "courseImage") {
          deleteCourseImage(
            findCourse as CourseModel,
            courseData.courseImage as File
          );
        }
        if (type === "mindmapImage") {
          deleteMindmapImage(
            findCourse as CourseModel,
            courseData.mindmapImage as File
          );
        }
      });
    }
    const updated = { ...updatedCourse, image: false };
    if (hasFiles.length > 0) {
      updated.image = true;
    }
    return updated;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    console.error(error);
    throw new CustomError(
      "An error occurred while updating the course",
      500,
      "update course",
      true
    );
  }
};

const deleteCourseImage = async (findCourse: CourseModel, file: File) => {
  try {
    for (const data of findCourse.urlData) {
      if (data.type === "course") {
        // Delete the existing image
        await deleteImgur(data.deleteHash);
        console.log("course image deleted");

        // Optional: Add a small delay before the next operation

        // Upload the new image
        const uploadResult = await uploadToImgur(file);
        console.log("course image uploaded", uploadResult.status);

        const newImageData = {
          deleteHash: uploadResult.data.deletehash,
          imgurId: uploadResult.data.id,
          url: uploadResult.data.link,
        };

        // Update the database record
        await prisma.urlData.update({
          where: { id: data.id },
          data: {
            ...newImageData,
            updatedAt: new Date(),
          },
        });
      }
    }
  } catch (err) {
    console.error("Error processing course image:", err);
  }
};

const deleteMindmapImage = async (findCourse: CourseModel, file: File) => {
  try {
    for (const data of findCourse.urlData) {
      if (data.type === "mindmap") {
        await deleteImgur(data.deleteHash);
        console.log("mindmap image deleted");

        // Upload the new image
        const uploadResult = await uploadToImgur(file);
        console.log("mindmap image uploaded", uploadResult.status);

        const newImageData = {
          deleteHash: uploadResult.data.deletehash,
          imgurId: uploadResult.data.id,
          url: uploadResult.data.link,
        };

        // Update the database record
        await prisma.urlData.update({
          where: { id: data.id },
          data: {
            ...newImageData,
            updatedAt: new Date(),
          },
        });
      }
    }
  } catch (err) {
    console.error("Error processing mindmap image:", err);
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
