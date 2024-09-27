import { CustomError, errorHandler } from "@/app/api/error";
import {
  dashboardAllCourseDataService,
  dashboardEditCourseService,
} from "@/app/api/services/dashboard";
import {
  editCourseSchemaForBackend,
  validateWithSchema,
} from "@/utils/validations";
import { NextRequest, NextResponse } from "next/server";
interface Props {
  params: { id: number };
}
export const GET = async (req: NextRequest, { params }: Props) => {
  try {
    const id = params.id;
    if (isNaN(id) || id === 0) {
      throw new CustomError("invalid course id", 404, "", true);
    }
    const course = await dashboardAllCourseDataService(+params.id);
    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};

export const PUT = async (req: NextRequest, { params }: Props) => {
  try {
    const id = params.id;
    if (isNaN(id) || id === 0) {
      throw new CustomError("invalid course id", 404, "", true);
    }
    const data = await req.formData();
    const processedFormData = await validateCourseForEdit(data);
    const course = await dashboardEditCourseService(
      +params.id,
      processedFormData
    );
    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};

export const processFormData = (data: FormData) => {
  return Array.from(data.entries()).reduce((acc, [key, value]) => {
    if (typeof value === "string") {
      const trimmedValue = value.trim();
      const parsedNumber = Number(trimmedValue);

      if (!isNaN(parsedNumber) && parsedNumber >= 0) {
        acc[key] = parsedNumber;
      } else if (trimmedValue.length > 0) {
        acc[key] = trimmedValue;
      }
    } else if (typeof value === "object") {
      acc[key] = value as File;
    }

    return acc;
  }, {} as Record<string, string | number | object>);
};

export const validateCourseForEdit = async (form: FormData) => {
  try {
    if (!form) {
      throw new CustomError("Invalid data", 400, "validation error");
    }

    const actualValues = processFormData(form);

    console.log("Processed values:", actualValues);

    const schema = editCourseSchemaForBackend();
    schema.parse(actualValues);

    return actualValues;
  } catch (error) {
    const validationErrors = validateWithSchema(error);
    throw new CustomError(
      "Validation Error",
      400,
      "validation error",
      false,
      "There were errors with the submitted data.",
      validationErrors
    );
  }
};
