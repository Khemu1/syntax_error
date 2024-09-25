import { NextRequest, NextResponse } from "next/server";
import {
  dashboardAdminsService,
  dashboardDeleteAdminsService,
  dashboardNewAdminsService,
} from "../../services/dashboard";
import { errorHandler } from "../../error";
import { SignUpProps } from "@/types";

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
    await dashboardDeleteAdminsService(ids);
    return NextResponse.json(
      { message: "accounts deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const data = (await req.json()) as SignUpProps;
    const newAdmin = await dashboardNewAdminsService(data);
    return NextResponse.json(newAdmin, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
};
