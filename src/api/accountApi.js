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
