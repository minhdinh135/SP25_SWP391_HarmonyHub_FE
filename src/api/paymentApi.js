import axios from "axios";

const API_BASE_URL = "https://harmony-backend-tlgv.onrender.com/api";

// Get payment details by VNPay order ID
export const getVnpayPaymentByOrderId = async (orderId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/payments/vnpay/${orderId}`
    );

    if (response.data && response.data.statusCode === 200) {
      return response.data.data;
    }
    throw new Error(response.data.message || "Failed to fetch payment details");
  } catch (error) {
    console.error("Error fetching payment details:", error);
    throw error.response?.data?.message || error.message || "An error occurred";
  }
};

// Update appointment status after successful payment
export const updateAppointmentPaymentStatus = async (appointmentId, status) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/appointments/${appointmentId}/payment-status`,
      { paymentStatus: status }
    );

    if (response.data && response.data.statusCode === 200) {
      return response.data.data;
    }
    throw new Error(response.data.message || "Failed to update appointment payment status");
  } catch (error) {
    console.error("Error updating appointment payment status:", error);
    throw error.response?.data?.message || error.message || "An error occurred";
  }
};

// Record a new payment transaction
export const recordPaymentTransaction = async (paymentData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/payments/record`,
      paymentData
    );

    if (response.data && response.data.statusCode === 200) {
      return response.data.data;
    }
    throw new Error(response.data.message || "Failed to record payment transaction");
  } catch (error) {
    console.error("Error recording payment transaction:", error);
    throw error.response?.data?.message || error.message || "An error occurred";
  }
};
