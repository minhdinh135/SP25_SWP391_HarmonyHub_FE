import BASE_API_URL from "@/constants/api";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

export const getAllAccounts = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/accounts`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    toast({ title: "Account Error", description: error.response.data.message });
    throw error;
  }
};
