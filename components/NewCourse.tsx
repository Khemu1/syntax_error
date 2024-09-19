"use client";
import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
type TinyMCEEditor = {
  getContent: () => string;
};
export default function App() {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [mentour, setMentour] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editorRef && editorRef.current) {
      const formData = new FormData(e.currentTarget);
      const content = editorRef.current.getContent();
      formData.append("content", content);
      console.log(formData);
    }
  };
  const handleMentour=(e:React.ChangeEvent<HTMLInputElement>) => {
    e.currentTarget===
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Course Title</label>
        <input id="title" name="title" type="text" required />
      </div>
      <div>
        <label htmlFor="">about instructor</label>
        <Editor
          apiKey={process.env.NEXT_PUBLIC_EDITOR_KEY}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>
      <div>
        <label htmlFor="mintour">There{"'"}s a mentour </label>
        <input id="mintour" type="checkbox" value={"mentor"} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
