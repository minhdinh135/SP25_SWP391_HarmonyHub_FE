import api from "./apiConfig";

export const getAllSpecialties = async () => {
  try {
    const response = await api.get("/specialties");
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting all specialties");
  }
};
