import { CustomError } from "@/app/api/error";
import { deleteAminds, getAdmins, getCourses, getMyInfo, getOwners } from "@/services/admin";
import {
  AdminDashboard,
  CourseDashboard,
  MyDataDashboard,
  OwnerDashboard,
} from "@/types";
import { useState, useCallback } from "react";

export const useGetMyInfo = () => {
  const [data, setData] = useState<MyDataDashboard | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | Record<string, string> | null>(
    null
  );
  const [success, setSuccess] = useState<boolean>(false);

  const handleGetMyInfo = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      setSuccess(true);
      setData(await getMyInfo());
    } catch (err: unknown) {
      if (err instanceof CustomError) {
        setError(err.errors || { message: err.message });
      } else {
        setError({ message: "An unknown error occurred." });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { handleGetMyInfo, loading, error, success, data };
};

export const useGetAdmins = () => {
  const [data, setData] = useState<AdminDashboard[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | Record<string, string> | null>(
    null
  );
  const [success, setSuccess] = useState<boolean>(false);

  const handleGetAdmins = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      setSuccess(true);
      setData(await getAdmins());
    } catch (err: unknown) {
      if (err instanceof CustomError) {
        setError(err.errors || { message: err.message });
      } else {
        setError({ message: "An unknown error occurred." });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { handleGetAdmins, loading, error, success, data };
};

export const useGetOwners = () => {
  const [data, setData] = useState<OwnerDashboard[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | Record<string, string> | null>(
    null
  );
  const [success, setSuccess] = useState<boolean>(false);

  const handleGetOwners = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      setSuccess(true);
      setData(await getOwners());
    } catch (err: unknown) {
      if (err instanceof CustomError) {
        setError(err.errors || { message: err.message });
      } else {
        setError({ message: "An unknown error occurred." });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { handleGetOwners, loading, error, success, data };
};

export const useGetCourses = () => {
  const [data, setData] = useState<CourseDashboard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | Record<string, string> | null>(
    null
  );
  const [success, setSuccess] = useState<boolean>(false);

  const handleGetCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      setSuccess(true);
      setData(await getCourses());
    } catch (err: unknown) {
      if (err instanceof CustomError) {
        setError(err.errors || { message: err.message });
      } else {
        setError({ message: "An unknown error occurred." });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { handleGetCourses, loading, error, success, data };
};

export const useDeleteAdmins = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Record<string, string> | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleDeleteAdmins = async (Ids: number[]) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await deleteAminds(Ids);
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

  return { handleDeleteAdmins, loading, error, success };
};
