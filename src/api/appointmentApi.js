import api from "./apiConfig";

export const getMemberAppointments = async (memberId) => {
  try {
    const response = await api.get(`/members/${memberId}/appointments`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting member appointments");
  }
};

export const getTherapistAppointments = async (therapistId) => {
  try {
    const response = await api.get(`/therapists/${therapistId}/appointments`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting therapist appointments");
  }
};

export const getAppointmentDetails = async (appointmentId) => {
  try {
    const response = await api.get(`/appointments/${appointmentId}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting appointment details");
  }
};

export const createAppointment = async (memberId, payload) => {
  try {
    await api.post(`/members/${memberId}/appointments`, payload);
  } catch (error) {
    console.log(error);
    throw new Error("Error creating appointment");
  }
};

export const updateAppointmentStatus = async (appointmentId, payload) => {
  try {
    await api.put(`/appointments/${appointmentId}/status`, payload);
  } catch (error) {
    console.log(error);
    throw new Error("Error updating appointment status");
  }
};

export const updateAppointmentFeedback = async (appointmentId, payload) => {
  try {
    await api.put(`/appointments/${appointmentId}/feedback`, payload);
  } catch (error) {
    console.log(error);
    throw new Error("Error updating appointment feedback");
  }
};

export const deleteAppointmentFeedback = async (appointmentId, payload) => {
  try {
    await api.put(`/appointments/${appointmentId}/delete-feedback`, payload);
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting appointment feedback");
  }
};

export const updateAppointmentNote = async (appointmentId, payload) => {
  try {
    await api.put(`/appointments/${appointmentId}/therapist-note`, payload);
  } catch (error) {
    console.log(error);
    throw new Error("Error updating therapist note");
  }
};

export const updateAppointmentMeetUrl = async (appointmentId, payload) => {
  try {
    await api.put(`/appointments/${appointmentId}/meet-url`, payload);
  } catch (error) {
    console.log(error);
    throw new Error("Error updating meeting url");
  }
};
