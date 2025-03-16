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

export const getQuizDetails = async (quizId) => {
  try {
    const response = await api.get(`/quiz/${quizId}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting quiz details");
  }
};

export const createQuiz = async () => {
  try {
    await api.post("/quiz/create");
  } catch (error) {
    console.log(error);
    throw new Error("Error creating quiz");
  }
};

export const updateQuizImageUrl = async (quizId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    await api.put(`/quiz/imgUrl/${quizId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error updating quiz image");
  }
};

export const updateQuizStatus = async (id, status) => {
  try {
    await api.put(`/quiz/SetStatus/${id}?status=${status}`);
  } catch (error) {
    console.log(error);
    throw new Error("Error updating quiz status");
  }
};
