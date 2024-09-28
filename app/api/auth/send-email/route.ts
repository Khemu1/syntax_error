import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "../../error";
import { sendEmailService } from "../../services/authService";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    console.log(data);
    await sendEmailService(data);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
