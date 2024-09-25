import { jwtVerify, SignJWT } from "jose";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { CustomError } from "../error";

export const accessCookieOptions: Partial<ResponseCookie> = {
  maxAge: parseInt(process.env.ACCESS_COOKIE_TIME as string), // 1 hour in seconds
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

export const refreshCookieOptions: Partial<ResponseCookie> = {
  maxAge: parseInt(process.env.REFRESH_COOKIE_TIME as string), // 7 days in seconds
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

const accessSecret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
const refreshSecret = new TextEncoder().encode(
  process.env.REFRESH_TOKEN_SECRET
);

export const generateAccessTokens = async (user: {
  id: number;
  role: number;
  username: string;
}) => {
  try {
    const jwt = await new SignJWT({
      id: user.id,
      role: user.role,
      username: user.username,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(process.env.ACCESS_TOKEN_TIME as string)
      .setIssuedAt()
      .sign(accessSecret);

    return jwt;
  } catch (error) {
    console.log(error);
    throw new CustomError(
      "An error occurred while generating refresh token ",
      500,
      "token",
      true
    );
  }
};

export const generateRefreshTokens = async (user: {
  id: number;
  role: number;
  username: string;
}) => {
  try {
    const jwt = await new SignJWT({
      id: user.id,
      role: user.role,
      username: user.username,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(process.env.REFRESH_TOKEN_TIME as string)
      .setIssuedAt()
      .sign(refreshSecret);

    return jwt;
  } catch (error) {
    console.log(error);
    throw new CustomError(
      "An error occurred while generating refresh token ",
      500,
      "token",
      true
    );
  }
};

export const verifyAccessToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, accessSecret);
    return payload; // This will contain the decoded data, like id, role, username
  } catch (error) {
    console.log(error);
    throw new CustomError(
      "An error occurred while veryfing access token: ",
      500,
      "token",
      true
    );
  }
};

export const verifyRefreshToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, refreshSecret);
    return payload;
  } catch (error) {
    console.log(error);
    throw new CustomError(
      "An error occurred while veryfing refresh token: ",
      500,
      "token",
      true
    );
  }
};
