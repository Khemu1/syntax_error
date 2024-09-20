import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { RefObject } from "react";

type EditorComponentProps = {
  editorRef: RefObject<TinyMCEEditor | null>;
};

const EditorComponent = ({ editorRef }: EditorComponentProps) => (
  <div>
    <label htmlFor="editor" className="font-semibold text-xl">
      About Instructor & Mentour
    </label>
    <Editor
      id="editor"
      apiKey={process.env.NEXT_PUBLIC_EDITOR_KEY}
      onInit={(_evt, editor) => {
        if (editorRef && editorRef.current === null) {
          editorRef.current = editor;
        }
      }}
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
);
export default EditorComponent;
