import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { FilePondFile } from "filepond";
import { FileUploaderProps } from "@/types";
import { useState } from "react";

// Register the plugins with FilePond
registerPlugin(FilePondPluginImagePreview);

const FileUploader: React.FC<FileUploaderProps> = ({
  files,
  setFiles,
  title,
}) => {
  // State to store deletehash returned by Imgur on upload
  const [deleteHashes, setDeleteHashes] = useState<Record<string, string>>({});

  const handleUpload = (fileItems: FilePondFile[]) => {
    setFiles(fileItems); // Update the state with the uploaded files
  };

  const handleRevert = async (
    fileId: string,
    load: () => void,
    error: (message: string) => void
  ) => {
    const deleteHash = deleteHashes[fileId]; // Get the delete hash for the specific file

    if (!deleteHash) {
      error("No delete hash found for this file.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.imgur.com/3/image/${deleteHash}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_IMGUR_TOKEN}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Image deleted:", data);
        load(); // Notify FilePond that the deletion was successful
      } else {
        throw new Error(data.error || "Failed to delete the image.");
      }
    } catch (err) {
      console.error("Error deleting image:", err);
      error("Failed to delete the image.");
    }
  };

  return (
    <div>
      <h2>Upload {title} Image:</h2>
      <FilePond
        files={files}
        allowMultiple={false}
        onupdatefiles={handleUpload}
        server={{
          url: "https://api.imgur.com/3/image",
          process: {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_IMGUR_TOKEN}`, // Use your Bearer token here
            },
            withCredentials: false, // Prevent CORS issues
            method: "POST",
            ondata: (formData) => {
              formData.append("image", files[0].file); // Append the first file to 'image'
              return formData;
            },
            onload: (response) => {
              // Parse the response and store the deletehash
              const jsonResponse = JSON.parse(response);
              const deleteHash = jsonResponse.data.deletehash;
              const fileId = files[0].id; // Store deletehash associated with the file's id
              setDeleteHashes((prev) => ({ ...prev, [fileId]: deleteHash }));
              return jsonResponse.data.id; // Return image id to track upload
            },
          },
          revert: (uniqueFileId, load, error) => {
            handleRevert(uniqueFileId, load, error); // Call the delete function using deletehash
          },
        }}
        name={title.toLowerCase() + "Image"}
      />
    </div>
  );
};

export default FileUploader;
