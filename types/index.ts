import { FilePondFile } from "filepond";
import { Dispatch, SetStateAction } from "react";

export interface SignInProps {
  usernameOrEmail: string;
  password: string;
}
export interface FileUploaderProps {
  files: FilePondFile[];
  setFiles: Dispatch<SetStateAction<FilePondFile[]>>;
  title: string;
}
