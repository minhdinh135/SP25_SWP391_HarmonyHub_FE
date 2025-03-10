import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileQuestion,
  Filter,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminQuizManagement = () => {
  // Sample data from your API
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Status options
  const statusOptions = {
    1: {
      label: "Pending",
      color: "bg-yellow-100 text-yellow-800",
      icon: <Clock className="h-4 w-4" />,
    },
    2: {
      label: "Approved",
      color: "bg-green-100 text-green-800",
      icon: <CheckCircle className="h-4 w-4" />,
    },
  };

  // Fetch quizzes from API (mocked for now)
  useEffect(() => {
    // Simulating API fetch
    const fetchData = () => {
      const data = [
        {
          id: 24,
          imageUrl:
            "https://res.cloudinary.com/drtolqkjw/image/upload/v1741370408/qd6tyeiturkgncp9vje7.jpg",
          title: "Huy co ny khong",
          description: "Huy co don",
          status: 2,
          therapistId: 3,
          questionResponse: [],
        },
        {
          id: 25,
          imageUrl:
            "https://res.cloudinary.com/drtolqkjw/image/upload/v1741525562/ackm7ssf6sqhrrnewo5w.png",
          title: "Quiz test",
          description: "test host new",
          status: 2,
          therapistId: 3,
          questionResponse: [],
        },
        {
          id: 26,
          imageUrl:
            "https://res.cloudinary.com/drtolqkjw/image/upload/v1741524653/eitifce0wpq52mna54ng.jpg",
          title: "Before You Say 'I Do' Premarital Quiz",
          description: "Are you ready for marriage? ",
          status: 1,
          therapistId: 3,
          questionResponse: [
            {
              id: 21,
              content: "1. How would you describe your partner? ",
              optionResponse: [
                { content: "Original, foolish, charming" },
                { content: "Sensitive, loving, caring, funny " },
                { content: "Nothing special compared to others " },
                { content: " Just a normal person" },
              ],
            },
            // Additional questions omitted for brevity
          ],
        },
        {
          id: 27,
          imageUrl:
            "https://res.cloudinary.com/drtolqkjw/image/upload/v1741525061/sft7xbpsjkovw1v1sxlh.jpg",
          title: "Pre-Marriage Counseling Quiz",
          description: "Test Quiz",
          status: 1,
          therapistId: 3,
          questionResponse: [
            // Questions omitted for brevity
          ],
        },
        {
          id: 28,
          imageUrl:
            "https://res.cloudinary.com/drtolqkjw/image/upload/v1741579189/gerehhdp9hmsokzxjajp.jpg",
          title: "Minh co gay khong",
          description: "ok",
          status: 1,
          therapistId: 3,
          questionResponse: [
            // Questions omitted for brevity
          ],
        },
        {
          id: 35,
          imageUrl: "string",
          title: "string",
          description: "string",
          status: 2,
          therapistId: 3,
          questionResponse: [
            // Questions omitted for brevity
          ],
        },
        {
          id: 36,
          imageUrl: "https://example.com/dbz-quiz-image.jpg",
          title: "Dragon Ball Z Quiz",
          description: "Test your knowledge about the Dragon Ball Z universe!",
          status: 2,
          therapistId: 3,
          questionResponse: [
            // Questions omitted for brevity
          ],
        },
      ];

      setQuizzes(data);
      setFilteredQuizzes(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Filter quizzes based on search term and status
  useEffect(() => {
    let result = quizzes;

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quiz.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((quiz) => quiz.status === parseInt(statusFilter));
    }

    setFilteredQuizzes(result);
  }, [searchTerm, statusFilter, quizzes]);

  // Update quiz status
  const handleStatusChange = (quizId, newStatus) => {
    // In a real app, you would make an API call here
    setQuizzes(
      quizzes.map((quiz) =>
        quiz.id === quizId ? { ...quiz, status: newStatus } : quiz,
      ),
    );
  };

  // View quiz details (in a real app, this would navigate to a detail page)
  const handleViewQuiz = (quizId) => {
    console.log(`Viewing quiz ${quizId}`);
    // Navigate to quiz detail page
    // history.push(`/admin/quizzes/${quizId}`);
  };

  const getQuestionCount = (quiz) => {
    return quiz.questionResponse ? quiz.questionResponse.length : 0;
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black flex items-center">
          <FileQuestion className="mr-3 h-8 w-8" />
          Quiz Management
        </h1>
        <div className="flex items-center space-x-2">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            Total: {quizzes.length}
          </Badge>
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Pending: {quizzes.filter((q) => q.status === 1).length}
          </Badge>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Approved: {quizzes.filter((q) => q.status === 2).length}
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-1 block">
                Search Quizzes
              </label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by title or description"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    className="absolute right-2 top-2.5"
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                )}
              </div>
            </div>

            <div className="w-full md:w-48">
              <label className="text-sm font-medium mb-1 block">Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="1">Pending</option>
                <option value="2">Approved</option>
              </select>
            </div>

            <Button
              variant="outline"
              className="flex items-center"
              onClick={clearFilters}
            >
              <Filter className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quiz List */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-center p-8">Loading quizzes...</div>
        ) : filteredQuizzes.length === 0 ? (
          <div className="text-center p-8">
            <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium">No quizzes found</h3>
            <p className="text-gray-500">
              Try adjusting your filters or add new quizzes
            </p>
          </div>
        ) : (
          filteredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-40 h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                  {quiz.imageUrl && quiz.imageUrl !== "string" ? (
                    <img
                      src="/api/placeholder/200/160"
                      alt={quiz.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <FileQuestion className="h-16 w-16 text-gray-300" />
                  )}
                </div>

                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{quiz.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {quiz.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={statusOptions[quiz.status].color}>
                        <span className="flex items-center">
                          {statusOptions[quiz.status].icon}
                          <span className="ml-1">
                            {statusOptions[quiz.status].label}
                          </span>
                        </span>
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-gray-50">
                      ID: {quiz.id}
                    </Badge>
                    <Badge variant="outline" className="bg-gray-50">
                      Therapist ID: {quiz.therapistId}
                    </Badge>
                    <Badge variant="outline" className="bg-gray-50">
                      Questions: {getQuestionCount(quiz)}
                    </Badge>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex space-x-2">
                      {quiz.status === 1 ? (
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-white"
                          onClick={() => handleStatusChange(quiz.id, 2)}
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                          onClick={() => handleStatusChange(quiz.id, 1)}
                        >
                          <Clock className="mr-1 h-4 w-4" />
                          Mark as Pending
                        </Button>
                      )}
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleViewQuiz(quiz.id)}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Add Summary or Pagination if needed */}
      <div className="flex justify-between items-center pt-4">
        <div className="text-sm text-gray-500">
          Showing {filteredQuizzes.length} of {quizzes.length} quizzes
        </div>

        {/* Pagination placeholder - implement as needed */}
        <div className="flex space-x-1">
          <Button size="sm" variant="outline" disabled>
            Previous
          </Button>
          <Button size="sm" variant="outline" className="bg-blue-50">
            1
          </Button>
          <Button size="sm" variant="outline" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminQuizManagement;
