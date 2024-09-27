import {  NextResponse } from "next/server";
import { dashboardCoursesService } from "../../services/dashboard";
import { errorHandler } from "../../error";
 export const runtime = 'edge';
export const GET = async () => {
  try {
    const data = await dashboardCoursesService();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
