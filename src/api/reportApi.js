import api from "./apiConfig";

export const getAllReports = async () => {
  try {
    const response = await api.get("/reports");
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting reports");
  }
};

export const getReportDetails = async (reportId) => {
  try {
    const response = await api.get(`/reports/${reportId}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting report details");
  }
};

export const createReport = async (payload) => {
  try {
    const response = await api.post("/reports", payload);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating report");
  }
};

export const updateReport = async (reportId, payload) => {
  try {
    const response = await api.put(`/reports/${reportId}`, payload);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating report");
  }
};
