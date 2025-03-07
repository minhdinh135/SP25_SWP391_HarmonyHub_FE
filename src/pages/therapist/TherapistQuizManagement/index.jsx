import { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import axios from "axios";

const TherapistQuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

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

  if (loading) return <div className="text-center text-lg font-semibold text-gray-700">Loading quizzes...</div>;
  if (error) return <div className="text-center text-red-500 font-semibold">{error}</div>;

  return (
    <DashboardLayout role="therapist">
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Pre-Marriage Counselling Quizzes</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          These quizzes are designed to help couples explore essential topics before marriage, enhancing communication and understanding.
        </p>
        {!selectedQuiz ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
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
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <button className="text-indigo-600 mb-4" onClick={() => setSelectedQuiz(null)}>← Back to Quizzes</button>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedQuiz.title}</h3>
            <img src={selectedQuiz.imageUrl} alt={selectedQuiz.title} className="w-full h-60 object-cover rounded-md mb-4" />
            <p className="text-gray-600 mb-4">{selectedQuiz.description}</p>
            <div>
              {selectedQuiz.questionResponse.length > 0 ? (
                selectedQuiz.questionResponse.map((question) => (
                  <div key={question.id} className="mb-4">
                    <h4 className="font-semibold text-gray-700">{question.content}</h4>
                    <ul className="list-disc ml-5 mt-2 text-gray-600">
                      {question.optionResponse.map((option, index) => (
                        <li key={index}>{option.content}</li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No questions available for this quiz.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TherapistQuizManagement;
