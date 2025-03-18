import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/api/apiConfig"
import { getAllQuizzes } from "@/api/quizApi";



const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const response = await getAllQuizzes();

        const activeQuizzes = response.filter(quiz => quiz.status === 1);
        setQuizzes(activeQuizzes);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching quizzes:", err);
      } finally {
        setError(null);
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading quizzes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-destructive/10 p-4 rounded-md flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-destructive">Error loading quizzes</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate question count for each quiz
  const getQuestionCount = (quiz) => {
    return quiz.questionResponse ? quiz.questionResponse.length : 0;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Relationship Quizzes</h1>
          <p className="text-muted-foreground mt-2">
            Discover more about yourself and your relationship patterns
          </p>
        </div>

        {quizzes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No active quizzes available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card
                key={quiz.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/quizzes/${quiz.id}`)}
              >
                <img
                  src={quiz.imageUrl}
                  alt={quiz.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/600x400?text=Quiz+Image";
                  }}
                />
                <CardHeader className="space-y-1">
                  <Badge variant="secondary">
                    {quiz.therapistId ? `Therapist ID: ${quiz.therapistId}` : "General"}
                  </Badge>
                  <CardTitle className="text-xl">{quiz.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    {quiz.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{getQuestionCount(quiz)} questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizList;
