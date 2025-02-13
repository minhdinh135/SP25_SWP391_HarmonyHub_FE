import BASE_API_URL from "@/constants/api";
import axios from "axios";

export const getMemberAppointments = async (memberId) => {
  try {
    const response = await axios.get(
      `${BASE_API_URL}/members/${memberId}/appointments`,
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting member appointments");
  }
};

export const getTherapistAppointments = async (therapistId) => {
  try {
    const response = await axios.get(
      `${BASE_API_URL}/therapists/${therapistId}/appointments`,
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting therapist appointments");
  }
};
