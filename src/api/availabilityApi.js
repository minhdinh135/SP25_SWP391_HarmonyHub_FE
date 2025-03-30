import api from "./apiConfig";

export const addAvailability = async (payload) => {
  try {
    await api.post(`/availability`, payload);
  } catch (error) {
    console.log(error);
    throw new Error("Error adding availability");
  }
};

export const deleteAvailability = async (id) => {
  try {
    await api.post(`/availabilities/${id}`);
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting availability");
  }
};

export const updateAvailability = async (id, payload) => {
  try {
    await api.put(`/availabilities/${id}`, payload);
  } catch (error) {
    console.log(error);
    throw new Error("Error updating availability");
  }
};
