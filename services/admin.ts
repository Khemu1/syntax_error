import { CustomError } from "@/app/api/error";
import {
  AdminDashboard,
  CourseDashboard,
  CustomErrorResponse,
  MyDataDashboard,
  OwnerDashboard,
} from "@/types";

export const getMyInfo = async (): Promise<MyDataDashboard> => {
  try {
    const response = await fetch("/api/dashboard/myinfo", {
      method: "GET",
    });

    if (!response.ok) {
      const errorData: CustomErrorResponse = await response.json();
      const err = new CustomError(
        errorData.message || "data fetch failed",
        response.status,
        "data fetch",
        false,
        errorData.details,
        errorData.errors
      );
      throw err;
    }

    const data: MyDataDashboard = await response.json();
    return data;
  } catch (error) {
    if (!(error instanceof CustomError)) {
      throw new CustomError("Network error", 500);
    }
    throw error;
  }
};

export const getCourses = async (): Promise<CourseDashboard[]> => {
  try {
    const response = await fetch("/api/dashboard/courses", {
      method: "GET",
    });

    if (!response.ok) {
      const errorData: CustomErrorResponse = await response.json();
      const err = new CustomError(
        errorData.message || "data fetch failed",
        response.status,
        "data fetch",
        false,
        errorData.details,
        errorData.errors
      );
      throw err;
    }

    const data: CourseDashboard[] = await response.json();
    return data;
  } catch (error) {
    if (!(error instanceof CustomError)) {
      throw new CustomError("Network error", 500);
    }
    throw error;
  }
};
export const getOwners = async (): Promise<OwnerDashboard[]> => {
  try {
    const response = await fetch("/api/dashboard/owners", {
      method: "GET",
    });

    if (!response.ok) {
      const errorData: CustomErrorResponse = await response.json();
      const err = new CustomError(
        errorData.message || "data fetch failed",
        response.status,
        "data fetch",
        false,
        errorData.details,
        errorData.errors
      );
      throw err;
    }

    const data: OwnerDashboard[] = await response.json();
    return data;
  } catch (error) {
    if (!(error instanceof CustomError)) {
      throw new CustomError("Network error", 500);
    }
    throw error;
  }
};
export const getAdmins = async (): Promise<AdminDashboard[]> => {
  try {
    const response = await fetch("/api/dashboard/admins", {
      method: "GET",
    });

    if (!response.ok) {
      const errorData: CustomErrorResponse = await response.json();
      const err = new CustomError(
        errorData.message || "data fetch failed",
        response.status,
        "data fetch",
        false,
        errorData.details,
        errorData.errors
      );
      throw err;
    }

    const data: AdminDashboard[] = await response.json();
    return data;
  } catch (error) {
    if (!(error instanceof CustomError)) {
      throw new CustomError("Network error", 500);
    }
    throw error;
  }
};

export const deleteAminds = async (
  ids: number[]
): Promise<AdminDashboard[]> => {
  try {
    const response = await fetch("/api/dashboard/admins", {
      method: "DELETE",
      body: JSON.stringify({ ids: ids }),
    });

    if (!response.ok) {
      const errorData: CustomErrorResponse = await response.json();
      const err = new CustomError(
        errorData.message || "deletion failed",
        response.status,
        "deletion",
        false,
        errorData.details,
        errorData.errors
      );
      throw err;
    }

    const data: AdminDashboard[] = await response.json();
    return data;
  } catch (error) {
    if (!(error instanceof CustomError)) {
      throw new CustomError("Network error", 500);
    }
    throw error;
  }
};

export const editAdmin = async (id: number): Promise<AdminDashboard[]> => {
  try {
    const response = await fetch(`/api/dashboard/admins/${id}`, {
      method: "UPDATE",
      body: JSON.stringify(id),
    });

    if (!response.ok) {
      const errorData: CustomErrorResponse = await response.json();
      const err = new CustomError(
        errorData.message || "edit failed",
        response.status,
        "edit",
        false,
        errorData.details,
        errorData.errors
      );
      throw err;
    }

    const data: AdminDashboard[] = await response.json();
    return data;
  } catch (error) {
    if (!(error instanceof CustomError)) {
      throw new CustomError("Network error", 500);
    }
    throw error;
  }
};
