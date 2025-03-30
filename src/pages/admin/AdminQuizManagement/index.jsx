import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileQuestion,
  Filter,
  Search,
  AlertCircle,
  X,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getAllQuizzes, updateQuizStatus } from "@/api/quizApi";
import { useNavigate } from "react-router-dom";
import { getQuizStatusColor } from "@/utils/colorUtils";
import { getQuizStatusText } from "@/utils/enumUtils";
import { QuizStatus } from "@/constants/status";
import Spinner from "@/components/Spinner";

const AdminQuizManagement = () => {
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getAllQuizzes();
      const sortedData = data.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
      );

      setQuizzes(sortedData);
      setFilteredQuizzes(sortedData);
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let result = quizzes;

    if (searchTerm) {
      result = result.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quiz.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((quiz) => quiz.status === parseInt(statusFilter));
    }

    setFilteredQuizzes(result);
  }, [searchTerm, statusFilter, quizzes]);

  const handleUpdateQuizStatus = async (id, statusEnum) => {
    try {
      setIsLoading(true);
      await updateQuizStatus(id, statusEnum);
      toast.success("Update quiz status successfully");
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      fetchData();
      setIsLoading(false);
    }
  };

  const handleViewQuiz = (quizId) => {
    navigate(`/quizzes/${quizId}`);
  };

  const getQuestionCount = (quiz) => {
    return quiz.questionResponse ? quiz.questionResponse.length : 0;
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  if (isLoading) return <Spinner />;

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
            Pending:{" "}
            {quizzes.filter((q) => q.status === QuizStatus.Pending).length}
          </Badge>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Active:{" "}
            {quizzes.filter((q) => q.status === QuizStatus.Active).length}
          </Badge>
          <Badge className="bg-red-100 text-red-800 border-red-200">
            Inactive:{" "}
            {quizzes.filter((q) => q.status === QuizStatus.Inactive).length}
          </Badge>
        </div>
      </div>

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
                <option value="all">Any</option>
                <option value={QuizStatus.Pending}>Pending</option>
                <option value={QuizStatus.Active}>Active</option>
                <option value={QuizStatus.Inactive}>Inactive</option>
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
        {filteredQuizzes.length === 0 ? (
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
                  {quiz.imageUrl ? (
                    <img
                      src={quiz.imageUrl}
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
                      <Badge className={getQuizStatusColor(quiz.status)}>
                        <span className="flex items-center">
                          {getQuizStatusText(quiz.status)}
                        </span>
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-gray-50">
                      Number of questions: {getQuestionCount(quiz)}
                    </Badge>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Button
                        variant="default"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() =>
                          handleUpdateQuizStatus(quiz.id, QuizStatus.Active)
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() =>
                          handleUpdateQuizStatus(quiz.id, QuizStatus.Inactive)
                        }
                      >
                        Reject
                      </Button>
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
