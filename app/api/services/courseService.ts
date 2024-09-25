import {  NewCourseProps } from "@/types";
import { PrismaClient } from "@prisma/client";
import { CustomError } from "../error";
import { uploadToImgur, deleteImages } from "./imgurServices";
const prisma = new PrismaClient();


export const addCourseService = async (
  data: NewCourseProps,
  userId: number
) => {
  try {
    const {
      title,
      courseImage,
      mindmapImage,
      courseInfo,
      instructorAndMentorInfo,
      price,
      totalSessions,
      totalSessionPerWeek,
      totalTasks,
    } = data;
    const courseImageResponse = await uploadToImgur(courseImage!);
    const mindmapImageResponse = await uploadToImgur(mindmapImage!);

    const course = await prisma.course.create({
      data: {
        title,
        instructorAndMentorInfo,
        courseInfo,
        price,
        totalSessions,
        totalSessionPerWeek,
        totalTasks,
        user: {
          connect: { id: userId },
        },
        urlData: {
          create: [
            {
              url: courseImageResponse.data.link,
              imgurId: courseImageResponse.data.id,
              deleteHash: courseImageResponse.data.deletehash,
              type: "course",
            },
            {
              url: mindmapImageResponse.data.link,
              imgurId: mindmapImageResponse.data.id,
              deleteHash: mindmapImageResponse.data.deletehash,
              type: "mindmap",
            },
          ],
        },
      },
    });

    return course;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

export const getAllCoursesService = async () => {
  try {
    const courses = await prisma.course.findMany({
      where: { deletedAt: null },
      include: { urlData: true },
    });

    const modifiedCourses = courses.map((course) => {
      const courseImages =
        course.urlData?.filter((url) => url.type === "course") || [];

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { urlData, ...Mcourse } = course;

      return {
        id: Mcourse.id,
        courseTitle: Mcourse.title,
        courseImage: courseImages.length > 0 ? courseImages[0].url : null,
      };
    });

    return modifiedCourses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getCourseService = async (id: number) => {
  try {
    if (isNaN(id) || id === 0) {
      throw new CustomError("invalid course id", 404, "", true);
    }
    const course = await prisma.course.findUniqueOrThrow({
      where: { id: +id, deletedAt: null },
      include: { urlData: true },
    });

    const courseImages =
      course.urlData?.filter((url) => url.type === "course") || [];
    const mindmapImages =
      course.urlData?.filter((url) => url.type === "mindmap") || [];

    return {
      id: course.id,
      title: course.title,
      instructorAndMentorInfo: course.instructorAndMentorInfo,
      courseInfo: course.courseInfo,
      courseImage: courseImages.length > 0 ? courseImages[0].url : null,
      mindmapImage: mindmapImages.length > 0 ? mindmapImages[0].url : null,
    };
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error;
  }
};

export const deleteCourseService = async (ids: number[]) => {
  try {
    const deletionPromises = ids.map(async (id) => {
      const findCourse = await prisma.course.findUnique({
        where: { id },
        include: {
          urlData: true, // Fetch associated urlData
        },
      });

      if (!findCourse) {
        throw new CustomError(`Course with ID ${id} not found`, 404, "", true);
      }

      const deleteHashes = findCourse.urlData
        .map((url) => url.deleteHash)
        .filter(Boolean);
      // .filter(Boolean) means that if it finds delete hash it will return true thus adding the string to the array

      if (deleteHashes.length > 0) {
        await deleteImages(deleteHashes);
      }

      await prisma.course.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });

      await prisma.urlData.updateMany({
        where: { courseId: id },
        data: { deletedAt: new Date() },
      });
    });

    await Promise.all(deletionPromises);

    return true;
  } catch (error) {
    throw error;
  }
};

