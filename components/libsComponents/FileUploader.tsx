import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { FileUploaderProps } from "@/types";
// Register plugins
registerPlugin(FilePondPluginImagePreview);

const FileUploader: React.FC<FileUploaderProps> = ({
  file,
  setFile,
  title,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-semibold text-xl">Upload {title}:</h2>
      <FilePond
        className={"dark"}
        files={file ? [file] : []}
        allowMultiple={false}
        onupdatefiles={(fileItems) => {
          setFile((fileItems[0]?.file as File) || null);
        }}
        name={`${title.toLowerCase()}Image`}
      />
    </div>
  );
};

export default FileUploader;
