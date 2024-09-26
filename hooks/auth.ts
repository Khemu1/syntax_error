import { CustomError } from "@/app/api/error";
import { authUser, signIn } from "@/services/auth";
import { login } from "@/store/slices/authSlice";
import { SignInProps } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Record<string, string> | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const routeTo = useRouter();
  const dispatch = useDispatch();
  const handleSignIn = async (data: SignInProps) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const { userId, username, role } = await signIn(data);
      localStorage.setItem(
        "userData",
        JSON.stringify({ userId, username, role })
      );
      dispatch(login({ username, userId, role }));
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof CustomError) {
        if (err.errors) {
          setError(err.errors);
        } else {
          setError({
            message: err.message,
          });
        }
      } else {
        setError({
          message: "An unknown error occurred.",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (success) {
      timeoutId = setTimeout(() => {
        routeTo.push("/");
      }, 1000);
    }
    if (error) {
      timeoutId = setTimeout(() => {
        setError(null);
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [error, success, routeTo]);

  return { handleSignIn, loading, error, success };
};

export const useAuthUser = () => {
  const routeTo = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();

  const handleSignIn = useCallback(async () => {
    try {
      const { userId, username, role } = await authUser();
      localStorage.setItem(
        "userData",
        JSON.stringify({ userId, username, role })
      );
      dispatch(login({ username, userId, role }));
    } catch (err) {
      localStorage.removeItem("userData");
      if (pathName.startsWith("/admin")) {
        routeTo.push("/signin");
      }
    }
  }, [dispatch, routeTo]);

  useEffect(() => {
    const isAuthPage =
      pathName.startsWith("/signin") ;
    if (!isAuthPage) {
      handleSignIn();
    }
  }, [handleSignIn, pathName]);

  return { handleSignIn };
};
