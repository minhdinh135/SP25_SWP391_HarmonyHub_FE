import api from "./apiConfig";

export const addAvailability = async (id, payload) => {
  try {
    await api.post(`/availabilities/${id}`, payload);
  } catch (error) {
    console.log(error);
    throw new Error("Error adding availability");
  }
};
