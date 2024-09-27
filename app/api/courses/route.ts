import {
  addCourseService,
  deleteCourseService,
  getAllCoursesService,
} from "../services/courseService";
import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "../error";
import { getCourseData } from "../middlewars/courseMiddleware";
export const POST = async (req: NextRequest) => {
  try {
    const userId = req.headers.get("User-Id")!;
    const courseData = await getCourseData(req);
    console.log("controller", courseData);

    // Now you have the course data in a usable object format
    const newCourse = await addCourseService(courseData, +userId);
    console.log(newCourse);
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
};

export const GET = async () => {
  try {
    const courses = await getAllCoursesService();
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const ids = data.ids as number[];
    console.log(ids);
    await deleteCourseService(ids);
    return NextResponse.json(
      { message: "Course deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
};
