import api from "./apiConfig";

export const addAvailability = async (id, payload) => {
  try {
    await api.post(`/availabilities/${id}`, payload);
  } catch (error) {
    console.log(error);
    throw new Error("Error adding availability");
  }
};

export const updateAvailability = async (id, payload) => {
  try {
    await api.post(
      `/availabilities/${id}?dayOfWeek=${payload.dayOfWeek}&fromTime=${payload.fromTime}&toTime=${payload.toTime}&therapistId=${payload.therapistId}`,
      payload,
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error updating availability");
  }
};
