import api from "./apiConfig";

export const getAllAccounts = async () => {
  try {
    const response = await api.get("/accounts");
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting accounts");
  }
};

export const getAllTherapists = async () => {
  try {
    const response = await api.get("/therapists");
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting therapists");
  }
};

export const getMemberDetails = async (memberId) => {
  try {
    const response = await api.get(`/members/${memberId}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting member details");
  }
};

export const getTherapistDetails = async (therapistId) => {
  try {
    const response = await api.get(`/therapists/${therapistId}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting therapist details");
  }
};

export const registerMember = async (payload) => {
  try {
    const response = await api.post("/register/member", payload);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error registering member");
  }
};

export const registerTherapist = async (payload) => {
  try {
    const response = await api.post("/register/therapist", payload);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error registering therapist");
  }
};
