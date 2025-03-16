import api from "./apiConfig";

export const createVnPayPaymentUrl = async (payload) => {
  try {
    const response = await api.post("/vnpay/pay", payload);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating VnPay payment url");
  }
};
