import { NextRequest, NextResponse } from "next/server";
import { dashboardAdminsService, dashboardDeleteAdminsService } from "../../services/adminService";
import { errorHandler } from "../../error";

export const GET = async () => {
  try {
    
    const data = await dashboardAdminsService();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const ids = data.ids as number[];
    await dashboardDeleteAdminsService(ids)
    return NextResponse.json(
      { message: "Course deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
};