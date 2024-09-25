// middleware.ts
import { newCourseSchema, validateWithSchema } from "@/utils/validations";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CustomError } from "../error";
import { NewCourseProps } from "@/types";

export const validateNewCourse = async (
  req: NextRequest,
  res: NextResponse
) => {
  try {
    const userId = res.headers.get("User-Id");
    const courseData = await getCourseData(req);

    // Validate the courseData using your schema
    newCourseSchema.parse(courseData);

    const response = NextResponse.next();
    response.headers.set("User-Id", userId as string);
    return response;
  } catch (error) {
    const validationErrors = validateWithSchema(error);
    throw new CustomError(
      "Validation Error",
      400,
      "validation error",
      false,
      "There were errors with the submitted data.",
      validationErrors
    );
  }
};
export const getCourseData = async (req: NextRequest) => {
  try {
    const formData = await req.formData();

    // Define course keys dynamically based on NewCourseProps
    const courseKeys: (keyof NewCourseProps)[] = [
      "title",
      "courseImage",
      "mindmapImage",
      "instructorAndMentorInfo",
      "courseInfo",
      "price",
      "totalSessions",
      "totalSessionPerWeek",
      "totalTasks",
    ];

    const courseData: Partial<NewCourseProps> = {};

    courseKeys.forEach((key) => {
      const value = formData.get(key);

      if (key === "courseImage" || key === "mindmapImage") {
        courseData[key] = (value as File) ?? null;
      } else if (
        key === "price" ||
        key === "totalSessions" ||
        key === "totalSessionPerWeek" ||
        key === "totalTasks"
      ) {
        courseData[key] = value ? Number(value) : 0;
      } else {
        courseData[key] =
          value !== undefined && value !== null ? String(value) : "";
      }
    });
    return courseData as NewCourseProps;
  } catch (error) {
    console.error("Error fetching course data:", error);
    throw error;
  }
};

export const checkDeletionIds = async (req: NextRequest,authUser:NextResponse) => {
  try {
    const userId = authUser.headers.get("User-Id") as string;

    const data = await req.json();
    if (!Array.isArray(data.ids)) {
      throw new CustomError(
        "No  IDs provided",
        400,
        "deletion error",
        true,
        "IDs must be provided as an array in the request body."
      );
    }

    if (data.ids.length < 1) {
      throw new CustomError(
        "Please choose an Id to delete",
        400,
        "deletion error",
        true,
        "At least one course ID must be provided."
      );
    }

    data.ids.forEach((id: number) => {
      if (typeof id !== "number" || !Number.isInteger(id) || id <= 0) {
        throw new CustomError(
          "Invalid  ID",
          400,
          "deletion error",
          true,
          "IDs must be positive integers."
        );
      }
    });

    const response = NextResponse.next();
    response.headers.set("User-Id", userId);
    return response;
  } catch (error) {
    throw error;
  }
};
