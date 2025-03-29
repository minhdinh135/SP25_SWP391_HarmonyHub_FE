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

export const getAccountById = async (id) => {
  try {
    const response = await api.get(`/accounts/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting account");
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

export const updateMemberDetails = async (memberId, payload) => {
  try {
    await api.put(`/members/${memberId}/profile`, payload);
  } catch (error) {
    console.log(error);
    throw new Error("Error updating member details");
  }
};

export const updateTherapistDetails = async (therapistId, payload) => {
  try {
    await api.put(`/therapists/${therapistId}/profile`, payload);
  } catch (error) {
    console.log(error);
    throw new Error("Error updating member details");
  }
};

export const addQualification = async (payload) => {
  try {
    await api.post(`/qualifications`, payload);
  } catch (error) {
    console.log(error);
    throw new Error("Error adding qualification");
  }
};

export const updateQualification = async (qualificationId, payload) => {
  try {
    await api.put(`/qualifications/${qualificationId}`, payload);
  } catch (error) {
    console.log(error);
    throw new Error("Error updating qualification");
  }
};

export const updateAccountAvatar = async (id, file) => {
  const formData = new FormData();
  formData.append("avatarFile", file);

  try {
    const response = await api.put(`/accounts/${id}/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating account avatar");
  }
};

export const updateAccountStatus = async (accountId, status) => {
  try {
    await api.put(`/accounts/${accountId}/status?status=${status}`);
  } catch (error) {
    console.log(error);
    throw new Error("Error updating account status");
  }
};
