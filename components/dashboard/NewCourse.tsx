import { useRef, useState } from "react";
import FileUploader from "../libsComponents/FileUploader"; // FileUploader component
import EditorComponent from "../libsComponents/EditorComponent"; // TinyMCE editor component
import { useAddCourse } from "@/hooks/course";
import { validateWithSchema, newCourseSchema } from "@/utils/validations";

type EditorInstance = {
  getContent: () => string;
  setContent: (content: string) => void;
};

const NewCourse = () => {
  const instructorAndMentorRef = useRef<EditorInstance | null>(null);
  const courseInfoRef = useRef<EditorInstance | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    totalSessions: 0,
    totalSessionPerWeek: 0,
    totalTasks: 0,
    price: 0,
    courseImage: null as File | null,
    mindmapImage: null as File | null,
  });

  const [validationErrors, setValidationErrors] = useState<Record<
    string,
    string
  > | null>(null);
  const { handleAddCourse, loading } = useAddCourse();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "totalSessions" ||
        name === "totalSessionPerWeek" ||
        name === "totalTasks" ||
        name === "price"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const instructorContent =
      instructorAndMentorRef.current?.getContent() || "";
    const courseContent = courseInfoRef.current?.getContent() || "";

    const submitData = {
      ...formData,
      instructorAndMentorInfo: instructorContent,
      courseInfo: courseContent,
    };

    try {
      console.log(formData.courseImage instanceof File,formData.courseImage)
      await newCourseSchema.parseAsync(submitData);

      if (!formData.courseImage || !formData.mindmapImage) {
        setValidationErrors({
          courseImage: !formData.courseImage ? "Course image is required." : "",
          mindmapImage: !formData.mindmapImage
            ? "Mindmap image is required."
            : "",
        });
        return;
      }
      // Clear previous validation errors
      setValidationErrors(null);
          const form = new FormData();
          Object.entries(submitData).forEach(([key, value]) => {
            if (value instanceof File) {
              form.append(key, value); 
            } else {
              form.append(key, String(value)); 
            }
          });
      await handleAddCourse(form);
    } catch (err) {
      setValidationErrors(validateWithSchema(err));
      console.log(validationErrors)
    }
  };

  return (
    <form
      encType="multipart/form-data"
      className="flex flex-col gap-9"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="font-semibold text-xl">
          Course Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          id="title"
          className="w-[250px] p-[9px] border-p-[3px]"
        />
        {validationErrors?.title && (
          <p className="text-red-500 font-semibold">{validationErrors.title}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="totalSessions" className="font-semibold text-xl">
          Total Number of Sessions
        </label>
        <input
          type="number"
          name="totalSessions"
          value={formData.totalSessions}
          onChange={handleChange}
          id="totalSessions"
          className="w-[250px] p-[9px] border-p-[3px]"
        />
        {validationErrors?.totalSessions && (
          <p className="text-red-500 font-semibold">
            {validationErrors.totalSessions}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="totalSessionPerWeek" className="font-semibold text-xl">
          Total Number of Sessions Per Week
        </label>
        <input
          type="number"
          name="totalSessionPerWeek"
          value={formData.totalSessionPerWeek}
          onChange={handleChange}
          id="totalSessionPerWeek"
          className="w-[250px] p-[9px] border-p-[3px]"
        />
        {validationErrors?.totalSessionPerWeek && (
          <p className="text-red-500 font-semibold">
            {validationErrors.totalSessionPerWeek}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="totalTasks" className="font-semibold text-xl">
          Total Number of Quizzes
        </label>
        <input
          type="number"
          name="totalTasks"
          value={formData.totalTasks}
          onChange={handleChange}
          id="totalTasks"
          className="w-[250px] p-[9px] border-p-[3px]"
        />
        {validationErrors?.totalTasks && (
          <p className="text-red-500 font-semibold">
            {validationErrors.totalTasks}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="price" className="font-semibold text-xl">
          Price
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          id="price"
          className="w-[250px] p-[9px] border-p-[3px]"
        />
        {validationErrors?.price && (
          <p className="text-red-500 font-semibold">{validationErrors.price}</p>
        )}
      </div>

      <FileUploader
        file={formData.courseImage}
        setFile={(file: File | null) =>
          setFormData((prevData) => ({ ...prevData, courseImage: file }))
        }
        title="Course Image"
      />
      {validationErrors?.courseImage && (
        <p className="text-red-500 font-semibold">
          {validationErrors.courseImage}
        </p>
      )}

      <EditorComponent
        editorRef={instructorAndMentorRef}
        id="instructorAndMentorEditor"
        title="About Instructor & Mentor"
      />
      {validationErrors?.instructorAndMentorInfo && (
        <p className="text-red-500 font-semibold">
          {validationErrors.instructorAndMentorInfo}
        </p>
      )}

      <EditorComponent
        editorRef={courseInfoRef}
        id="courseEditor"
        title="About Course"
      />
      {validationErrors?.courseInfo && (
        <p className="text-red-500 font-semibold">
          {validationErrors.courseInfo}
        </p>
      )}

      <FileUploader
        file={formData.mindmapImage}
        setFile={(file: File | null) =>
          setFormData((prevData) => ({ ...prevData, mindmapImage: file }))
        }
        title="Mindmap Image"
      />
      {validationErrors?.mindmapImage && (
        <p className="text-red-500 font-semibold">
          {validationErrors.mindmapImage}
        </p>
      )}

      <div className="flex justify-center">
        <button
          type="submit"
          className={`${
            loading ? "bg-base-100" : "bg-blue-600"
          } font-semibold text-white py-2 w-[200px] text-xl rounded-lg shadow-2xl`}
        >
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default NewCourse;
