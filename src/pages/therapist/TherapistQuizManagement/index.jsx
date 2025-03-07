import { useEffect, useState, useRef } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import axios from "axios";

const TherapistQuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddQuizModal, setShowAddQuizModal] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    description: "",
    imageUrl: "",
    questions: [{
      content: "",
      options: [{ content: "" }, { content: "" }]
    }]
  });
  const quizzesPerPage = 6;

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("https://harmony-backend.runasp.net/api/quizzes");
        setQuizzes(response.data.data);
      } catch (err) {
        setError("Failed to fetch quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleAddQuiz = async () => {
    try {
      // Transform the questions structure to match the API expectations
      const formattedQuestions = newQuiz.questions.map(question => ({
        content: question.content,
        options: question.options
      }));

      const requestBody = {
        title: newQuiz.title,
        description: newQuiz.description,
        imageUrl: newQuiz.imageUrl,
        therapistId: 3, // Fixed therapist ID as specified
        questions: formattedQuestions
      };

      await axios.post("https://harmony-backend.runasp.net/api/quizzes", requestBody);

      // Refresh quiz list after adding
      const response = await axios.get("https://harmony-backend.runasp.net/api/quizzes");
      setQuizzes(response.data.data);

      // Reset form and close modal
      setShowAddQuizModal(false);
      setNewQuiz({
        title: "",
        description: "",
        imageUrl: "",
        questions: [{
          content: "",
          options: [{ content: "" }, { content: "" }]
        }]
      });
    } catch (error) {
      console.error("Error adding quiz", error);
    }
  };

  const handleQuestionChange = (questionIndex, field, value) => {
    const updatedQuestions = [...newQuiz.questions];
    updatedQuestions[questionIndex][field] = value;
    setNewQuiz({ ...newQuiz, questions: updatedQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...newQuiz.questions];
    updatedQuestions[questionIndex].options[optionIndex].content = value;
    setNewQuiz({ ...newQuiz, questions: updatedQuestions });
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...newQuiz.questions];
    updatedQuestions[questionIndex].options.push({ content: "" });
    setNewQuiz({ ...newQuiz, questions: updatedQuestions });
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...newQuiz.questions];
    if (updatedQuestions[questionIndex].options.length > 2) {
      updatedQuestions[questionIndex].options.splice(optionIndex, 1);
      setNewQuiz({ ...newQuiz, questions: updatedQuestions });
    }
  };

  const addQuestion = () => {
    setNewQuiz({
      ...newQuiz,
      questions: [
        ...newQuiz.questions,
        { content: "", options: [{ content: "" }, { content: "" }] }
      ]
    });
  };

  const removeQuestion = (questionIndex) => {
    if (newQuiz.questions.length > 1) {
      const updatedQuestions = [...newQuiz.questions];
      updatedQuestions.splice(questionIndex, 1);
      setNewQuiz({ ...newQuiz, questions: updatedQuestions });
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);

      // Use the ID of the selected quiz
      const quizId = selectedQuiz.id;

      // Create FormData object to send the file
      const formData = new FormData();
      formData.append('image', file);

      // Send the file to the API with the current quiz's ID
      const response = await axios.post(
        `https://harmony-backend.runasp.net/api/quiz/imgUrl?Id=${quizId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // If successful, update the selected quiz's image URL
      if (response.data && response.data.imageUrl) {
        setSelectedQuiz({
          ...selectedQuiz,
          imageUrl: response.data.imageUrl
        });

        // Also update the quiz in the quizzes array
        const updatedQuizzes = quizzes.map(quiz =>
          quiz.id === selectedQuiz.id ? { ...quiz, imageUrl: response.data.imageUrl } : quiz
        );
        setQuizzes(updatedQuizzes);

        // Show success message
        alert(`Image for Quiz ID: ${quizId} uploaded successfully!`);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const indexOfLastQuiz = currentPage * quizzesPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
  const currentQuizzes = quizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);
  const totalPages = Math.ceil(quizzes.length / quizzesPerPage);

  if (loading) return <div className="text-center text-lg font-semibold text-gray-700">Loading quizzes...</div>;
  if (error) return <div className="text-center text-red-500 font-semibold">{error}</div>;

  return (
    <DashboardLayout role="therapist">
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Pre-Marriage Counselling Quizzes</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          These quizzes are designed to help couples explore essential topics before marriage, enhancing communication and understanding.
        </p>
        <button className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded-lg" onClick={() => setShowAddQuizModal(true)}>
          Add Quiz
        </button>

        {showAddQuizModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 overflow-y-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl my-8 mx-4">
              <h3 className="text-xl font-semibold mb-4">Add New Quiz</h3>

              {/* Basic Quiz Info */}
              <div className="mb-6">
                <h4 className="font-medium mb-2 text-gray-700">Quiz Information</h4>
                <input
                  type="text"
                  placeholder="Title"
                  value={newQuiz.title}
                  onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <textarea
                  placeholder="Description"
                  value={newQuiz.description}
                  onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })}
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                ></textarea>
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newQuiz.imageUrl}
                  onChange={(e) => setNewQuiz({ ...newQuiz, imageUrl: e.target.value })}
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
              </div>

              {/* Questions Section */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-700">Questions</h4>
                  <button
                    className="bg-green-600 text-white text-sm px-3 py-1 rounded-lg"
                    onClick={addQuestion}
                  >
                    Add Question
                  </button>
                </div>

                {newQuiz.questions.map((question, qIndex) => (
                  <div key={qIndex} className="border border-gray-200 p-4 rounded-lg mb-4">
                    <div className="flex justify-between mb-2">
                      <h5 className="font-medium">Question {qIndex + 1}</h5>
                      {newQuiz.questions.length > 1 && (
                        <button
                          className="text-red-600 text-sm"
                          onClick={() => removeQuestion(qIndex)}
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      placeholder="Question content"
                      value={question.content}
                      onChange={(e) => handleQuestionChange(qIndex, 'content', e.target.value)}
                      className="w-full p-2 mb-3 border border-gray-300 rounded"
                    />

                    <div className="ml-4">
                      <div className="flex justify-between items-center mb-2">
                        <h6 className="font-medium text-sm text-gray-600">Answer Options</h6>
                        <button
                          className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
                          onClick={() => addOption(qIndex)}
                        >
                          Add Option
                        </button>
                      </div>

                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center mb-2">
                          <input
                            type="text"
                            placeholder={`Option ${oIndex + 1}`}
                            value={option.content}
                            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                            className="flex-grow p-2 border border-gray-300 rounded"
                          />
                          {question.options.length > 2 && (
                            <button
                              className="ml-2 text-red-500 text-sm"
                              onClick={() => removeOption(qIndex, oIndex)}
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-4">
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2"
                  onClick={() => setShowAddQuizModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                  onClick={handleAddQuiz}
                >
                  Submit Quiz
                </button>
              </div>
            </div>
          </div>
        )}

        {!selectedQuiz ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
                  onClick={() => setSelectedQuiz(quiz)}
                >
                  <img src={quiz.imageUrl} alt={quiz.title} className="w-full h-48 object-cover rounded-md" />
                  <h3 className="text-xl font-semibold mt-4 text-gray-800">{quiz.title}</h3>
                  <p className="text-gray-600 mt-2">{quiz.description}</p>
                  <span className={`mt-4 inline-block px-4 py-2 text-sm font-medium rounded-full ${quiz.status === 1 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {quiz.status === 1 ? "Active" : "Inactive"}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6 space-x-4">
              <button className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 text-white'}`} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
              <span className="px-4 py-2 bg-gray-200 rounded-lg">Page {currentPage} of {totalPages}</span>
              <button className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 text-white'}`} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
            </div>
          </>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <button className="text-indigo-600 mb-4" onClick={() => setSelectedQuiz(null)}>← Back to Quizzes</button>

            {/* Quiz Info Section */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedQuiz.title}</h3>

              {/* Image section with upload button */}
              <div className="relative mb-4">
                <img src={selectedQuiz.imageUrl} alt={selectedQuiz.title} className="w-full h-60 object-cover rounded-md" />
                <div className="absolute bottom-4 right-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    onClick={triggerFileInput}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                    disabled={uploadingImage}
                  >
                    {uploadingImage ? "Uploading..." : "Upload New Image"}
                  </button>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{selectedQuiz.description}</p>
              <div className="flex items-center mb-6">
                <span className={`px-4 py-2 text-sm font-medium rounded-full ${selectedQuiz.status === 1 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                  {selectedQuiz.status === 1 ? "Active" : "Inactive"}
                </span>
                <span className="ml-4 text-gray-500">Quiz ID: {selectedQuiz.id}</span>
              </div>
            </div>

            {/* Questions Section */}
            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">Questions</h4>

              {selectedQuiz.questionResponse && selectedQuiz.questionResponse.length > 0 ? (
                <div className="space-y-6">
                  {selectedQuiz.questionResponse.map((question, qIndex) => (
                    <div key={qIndex} className="border border-gray-200 p-4 rounded-lg">
                      <h5 className="font-medium text-lg mb-3">Question {qIndex + 1}: {question.content}</h5>

                      <div className="ml-4">
                        <h6 className="font-medium text-sm text-gray-600 mb-2">Answer Options:</h6>
                        <ul className="list-disc ml-6 space-y-2">
                          {question.optionResponse && question.optionResponse.map((option, oIndex) => (
                            <li key={oIndex} className="text-gray-700">{option.content}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">No questions available for this quiz.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TherapistQuizManagement;
