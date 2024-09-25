import { CustomError } from "@/app/api/error";
import { CustomErrorResponse, SignInProps, SignInResponseProps } from "@/types";

export const signIn = async (
  formData: SignInProps
): Promise<SignInResponseProps> => {
  try {
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData: CustomErrorResponse = await response.json();
      const err = new CustomError(
        errorData.message || "Sign-in failed",
        response.status,
        "SignInError",
        false,
        errorData.details,
        errorData.errors
      );
      throw err;
    }

    const data: SignInResponseProps = await response.json();
    return data;
  } catch (error) {
    if (!(error instanceof CustomError)) {
      throw new CustomError("Network error", 500);
    }
    throw error;
  }
};

export const authUser = async (): Promise<SignInResponseProps> => {
  try {
    const response = await fetch("/api/auth/auth-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData: CustomErrorResponse = await response.json();
      const err = new CustomError(
        errorData.message || "Sign-in failed",
        response.status,
        "SignInError",
        false,
        errorData.details,
        errorData.errors
      );
      throw err;
    }

    const data: SignInResponseProps = await response.json();
    return data;
  } catch (error) {
    if (!(error instanceof CustomError)) {
      throw new CustomError("Network error", 500);
    }
    throw error;
  }
};
