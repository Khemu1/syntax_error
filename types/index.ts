import { CustomError } from "@/app/api/error";

export interface SignInProps {
  usernameOrEmail: string;
  password: string;
}
export interface SignUpProps {
  username: string;
  email: string;
  password: string;
}

export interface FileUploaderProps {
  file: File | null;
  setFile: (file: File | null) => void;
  title: string;
}

export interface imageDataResponse {
  status: number;
  success: boolean;
  data: {
    id: string;
    deletehash: string;
    account_id: number;
    account_url: string;
    ad_type: null;
    ad_url: null;
    title: string;
    description: string;
    name: string;
    type: string;
    width: number;
    height: number;
    size: number;
    views: null;
    section: null;
    vote: null;
    bandwidth: number;
    animated: boolean;
    favorite: boolean;
    in_gallery: boolean;
    in_most_viral: boolean;
    has_sound: boolean;
    is_ad: boolean;
    nsfw: null;
    link: string;
    tags: string[];
    datetime: number;
    mp4: string;
    hls: string;
  };
}
export interface ImageDeleteResponse {
  status: number;
  success: boolean;
  data: boolean;
}
export interface ImgurErrorResponse {
  success: boolean;
  status: number;
  message: string;
}

export type NewCourseProps = {
  title: string;
  courseImage: File;
  mindmapImage: File;
  instructorAndMentorInfo: string;
  courseInfo: string;
  price: number;
  totalSessions: number;
  totalSessionPerWeek: number;
  totalTasks: number;
};

export interface CustomErrorResponse extends CustomError {}

export interface SignInResponseProps {
  message: string;
  userId: number;
  role: number;
  username: string;
  token: string;
}

export interface PublicCardCourseProps {
  id: number;
  title: string;
  cardDescription: string;
  courseImage: string;
}

export interface PublicCourseProps {
  id: number;
  title: string;
  cardDescription: string;
  instructorAndMentorInfo: string;
  courseInfo: string;
  courseImage: string;
  mindmapImage: string;
}

export type MyDataDashboard = {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
};

export type OwnerDashboard = {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AdminDashboard = {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CourseDashboard = {
  id: number;
  title: string;
  price: number;
  user: {
    username: string;
  };
  createdAt: Date;
  updatedAt: Date;
};
export interface ToastProps {
  message: string;
  type: "success" | "error";
  duration?: number;
  onClose: () => void;
}
