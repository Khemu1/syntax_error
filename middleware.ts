import { NextRequest, NextResponse } from "next/server";
import {
  checkDeletionIds,
  validateNewCourse,
} from "./app/api/middlewars/courseMiddleware";
import {
  authenticateUser,
  checkOwnerRole,
  checkDashBoardRoles,
  signIn,
  checkAdminData,
} from "./app/api/middlewars/authMiddleware";
import { errorHandler } from "./app/api/error";

export async function middleware(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;
    if (pathname.startsWith("/api/courses")) {
      if (req.method === "POST") {
        const authUser = await authenticateUser();
        const validateCourse = await validateNewCourse(req, authUser);
        return validateCourse;
      }
      if (req.method === "DELETE") {
        const authUser = await authenticateUser();
        const checkRole = await checkOwnerRole(authUser);
        const validateIds = await checkDeletionIds(req, checkRole);
        return validateIds;
      }
      if (req.method === "UPDATE") {
        const authUser = await authenticateUser();
        const checkRole = await checkOwnerRole(authUser);
        const validateIds = await checkDeletionIds(req, checkRole);
        return validateIds;
      }
    }
    if (pathname.startsWith("/api/auth/signin")) {
      return signIn(req);
    }
    if (pathname.startsWith("/api/dashboard/courses")) {
      const authUser = await authenticateUser();
      const checkRole = await checkOwnerRole(authUser);
      return checkRole;
    }
    if (pathname.startsWith("/api/dashboard/admins")) {
      const authUser = await authenticateUser();
      const checkRole = await checkOwnerRole(authUser);
      if (req.method === "DELETE") {
        const checkIds = await checkDeletionIds(req, checkRole);
        return checkIds;
      }
      if (req.method === "POST") {
        const validateNewAdmin = checkAdminData(req, checkRole);
        return validateNewAdmin;
      }
      return checkRole;
    }
    if (pathname.startsWith("/api/dashboard/owners")) {
      const authUser = await authenticateUser();
      const checkRole = await checkOwnerRole(authUser);
      return checkRole;
    }
    if (pathname.startsWith("/api/dashboard/myinfo")) {
      const authUser = await authenticateUser();
      const checkRoles = await checkDashBoardRoles(authUser);
      return checkRoles;
    }
    return NextResponse.next();
  } catch (error) {
    return errorHandler(error);
  }
}

export const config = {
  matcher: ["/api/courses/:path*", "/api/auth", "/api/dashboard/:path*"],
};
