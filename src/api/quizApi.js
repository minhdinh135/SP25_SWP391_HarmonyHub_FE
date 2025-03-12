import api from "./apiConfig";

export const getAllQuizzes = async () => {
  try {
    const response = await api.get("/quiz");
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting all quizzes");
  }
};
