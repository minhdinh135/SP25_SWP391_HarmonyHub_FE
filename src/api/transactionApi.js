import api from "./apiConfig";

export const getAllTransactions = async () => {
  try {
    const response = await api.get("/transactions");
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting transactions");
  }
};

export const getTransactionByTransactionId = async (transactionId) => {
  try {
    const response = await api.get(`/transactions/${transactionId}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting transaction details");
  }
};
