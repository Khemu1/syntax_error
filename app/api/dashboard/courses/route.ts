import { NextRequest, NextResponse } from "next/server";
import { dashboardCoursesService } from "../../services/adminService";
import { errorHandler } from "../../error";

export const GET = async (req: NextRequest) => {
  try {
    const data = await dashboardCoursesService();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
