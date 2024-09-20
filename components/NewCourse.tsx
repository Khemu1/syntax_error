import { useRef, useState } from "react";
import EditorComponent from "./EditorComponent";
import { Editor as TinyMCEEditor } from "tinymce";
import FileUploader from "./FileUploader";
import { FilePondFile } from "filepond";

const NewCourse = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [title, setTitle] = useState("");

  const [courseImage, setCourseImage] = useState<FilePondFile[]>([]);
  const [mindmapImage, setMindmapImage] = useState<FilePondFile[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editorRef.current) {
      const formData = new FormData(e.currentTarget);
      const content = editorRef.current.getContent();
      formData.append("content", content);
      formData.append("title", title);

      // Append images to the form data
      if (courseImage.length > 0) {
        formData.append("courseImage", courseImage[0].file);
      }
      if (mindmapImage.length > 0) {
        formData.append("mindmapImage", mindmapImage[0].file);
      }

      console.log(formData);
      // Here you would typically send formData to your server
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Title Input */}
      <div>
        <label htmlFor="title">Course Title</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </div>
      {/* Course Image Uploader */}
      <FileUploader
        files={courseImage}
        setFiles={setCourseImage}
        title="Course"
      />
      {/* Editor Component */}
      <EditorComponent editorRef={editorRef} />

      {/* Mindmap Image Uploader */}
      <FileUploader
        files={mindmapImage}
        setFiles={setMindmapImage}
        title="Mindmap"
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default NewCourse;
