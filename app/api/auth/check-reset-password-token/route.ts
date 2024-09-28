import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "../../error";
import { getTokenService } from "../../services/tokenService";
import {
  generatePasswordResetToken,
  resetPasswordCookieOptions,
  verifyPasswordResetToken,
} from "../../services/jwtService";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const { userId, expiresAt, token } = await getTokenService(data);
    await verifyPasswordResetToken(token);
    const maxAge = Math.max(0, expiresAt.getTime() - Date.now());

    const options = resetPasswordCookieOptions(maxAge);
    const stoken = await generatePasswordResetToken({
      id: userId,
      token: token,
    });
    const response = NextResponse.json({ status: 200 });

    response.cookies.set("passwordResetToken", stoken, options);
    return response;
  } catch (error) {
    return errorHandler(error);
  }
};
