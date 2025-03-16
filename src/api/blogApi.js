import api from "./apiConfig";

export const getAllBlogs = async () => {
  try {
    const response = await api.get("/blogs");
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting all blogs");
  }
};

export const getBlogDetails = async (blogId) => {
  try {
    const response = await api.get(`/blogs/${blogId}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting blog details");
  }
};

export const getTherapistBlogs = async (therapistId) => {
  try {
    const response = await api.get(`/therapists/${therapistId}/blogs`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting therapist blogs");
  }
};

export const createBlog = async (payload) => {
  try {
    await api.post("/blogs", payload);
  } catch (error) {
    console.log(error);
    throw new Error("Error creating blog");
  }
};

export const updateBlogStatus = async (id, status) => {
  try {
    await api.put(`/blogs/${id}/status?status=${status}`);
  } catch (error) {
    console.log(error);
    throw new Error("Error updating blog status");
  }
};
