import BASE_API_URL from "@/constants/api";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

export const accountLogin = async (payload) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/auth/login`, payload);
    return response.data.data;
  } catch (error) {
    console.log(error);
    toast({ title: "Login Error", description: error.response.data.message });
    throw error;
  }
};
