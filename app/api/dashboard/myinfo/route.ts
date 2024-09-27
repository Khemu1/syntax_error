import { NextRequest, NextResponse } from "next/server";
import { dahsboardEditMyAccount, dashboardMyDataService } from "../../services/dashboard";
import { errorHandler } from "../../error";
import { EditMyAccountProps } from "@/types";
export const GET = async (req: NextRequest) => {
  try {
    const userId = req.headers.get("User-Id") as string;
    const data = await dashboardMyDataService(+userId);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};


export const PUT = async (req: NextRequest) => {
  try {
    const data = (await req.json()) as EditMyAccountProps;
    const userId = req.headers.get("User-Id") as string;

    const newInfo = await dahsboardEditMyAccount(data, +userId);
    return NextResponse.json(newInfo, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
