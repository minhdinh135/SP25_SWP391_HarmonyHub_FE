import BASE_API_URL from "@/constants/api";
import axios from "axios";

export const getAllAccounts = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/accounts`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting accounts");
  }
};

export const getAllTherapists = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/therapists`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting therapists");
  }
};

export const getMemberDetails = async (memberId) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/members/${memberId}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting member details");
  }
};

export const getTherapistDetails = async (therapistId) => {
  try {
    const response = await axios.get(
      `${BASE_API_URL}/therapists/${therapistId}`,
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting therapist details");
  }
};

export const registerMember = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_API_URL}/register/member`,
      payload,
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error registering member");
  }
};

export const registerTherapist = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_API_URL}/register/therapist`,
      payload,
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error registering therapist");
  }
};
