import { imageDataResponse, ImageDeleteResponse } from "@/types";
import { CustomError } from "../error";

export const uploadToImgur = async (
  image: File
): Promise<imageDataResponse> => {
  const imgurFormData = new FormData();
  imgurFormData.append("image", image);
  imgurFormData.append("type", image.type);
  imgurFormData.append("type", Date.now().toString());

  const response = await fetch("https://api.imgur.com/3/image", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.IMGUR_TOKEN}`,
    },
    body: imgurFormData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Imgur error: ${errorData.message}`);
  }
  return response.json();
};
export const deleteImgur = async (
  deleteHash: string
): Promise<ImageDeleteResponse> => {
  const response = await fetch(`https://api.imgur.com/3/image/${deleteHash}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${process.env.IMGUR_TOKEN}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Imgur error: ${errorData.message}`);
  }
  return response.json();
};

export const deleteImages = async (deleteHashes: string[]) => {
  const deletionPromises = deleteHashes.map(async (deleteHash) => {
    try {
      const response = await deleteImgur(deleteHash);
      return response;
    } catch (error) {
      console.error(`Failed to delete image with hash ${deleteHash}:`, error);
      throw new CustomError(
        "image deletion faild from imgur",
        400,
        "imgur",
        true,
        "check the logs"
      );
    }
  });

  try {
    const results = await Promise.all(deletionPromises);
    return results;
  } catch (error) {
    throw error;
  }
};
