import api from "./apiConfig";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post("/cloudinary", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error uploading file to Cloudinary");
  }
};
