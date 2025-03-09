import api from "./apiConfig";

export const accountLogin = async (payload) => {
  try {
    const response = await api.post("/auth/login", payload);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Login failed");
  }
};
