import { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import axios from "axios";

const TherapistQuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddQuizModal, setShowAddQuizModal] = useState(false);
  const [newQuiz, setNewQuiz] = useState({ title: "", description: "", imageUrl: "", questions: [] });
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
      await axios.post("https://harmony-backend.runasp.net/api/quizzes", {
        ...newQuiz,
        therapistId: 3,
      });
      setShowAddQuizModal(false);
      setNewQuiz({ title: "", description: "", imageUrl: "", questions: [] });
    } catch (error) {
      console.error("Error adding quiz", error);
    }
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
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-semibold mb-4">Add New Quiz</h3>
              <input type="text" placeholder="Title" value={newQuiz.title} onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })} className="w-full p-2 mb-2 border border-gray-300 rounded" />
              <textarea placeholder="Description" value={newQuiz.description} onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })} className="w-full p-2 mb-2 border border-gray-300 rounded"></textarea>
              <input type="text" placeholder="Image URL" value={newQuiz.imageUrl} onChange={(e) => setNewQuiz({ ...newQuiz, imageUrl: e.target.value })} className="w-full p-2 mb-2 border border-gray-300 rounded" />
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg" onClick={handleAddQuiz}>Submit</button>
              <button className="ml-2 bg-gray-400 text-white px-4 py-2 rounded-lg" onClick={() => setShowAddQuizModal(false)}>Cancel</button>
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
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedQuiz.title}</h3>
            <img src={selectedQuiz.imageUrl} alt={selectedQuiz.title} className="w-full h-60 object-cover rounded-md mb-4" />
            <p className="text-gray-600 mb-4">{selectedQuiz.description}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TherapistQuizManagement;
