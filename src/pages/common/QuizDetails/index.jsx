import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const QuizDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://sp25-swp391-harmonyhub-be.onrender.com/api/quizzes");

        if (!response.ok) {
          throw new Error("Failed to fetch quiz details");
        }

        const result = await response.json();
        const selectedQuiz = result.data.find(q => q.id === parseInt(id));

        if (!selectedQuiz) {
          throw new Error("Quiz not found");
        }

        setQuiz(selectedQuiz);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching quiz details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading quiz details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/quizzes")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Quizzes
          </Button>
        </div>
        <div className="bg-destructive/10 p-4 rounded-md flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-destructive">Error loading quiz</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/quizzes")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Quizzes
          </Button>
        </div>
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Quiz not found</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/quizzes")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Quizzes
        </Button>
      </div>
      <Card>
        <div className="relative">
          <img
            src={quiz.imageUrl}
            alt={quiz.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src = "https://placehold.co/600x400?text=Quiz+Image";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <CardHeader className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">
              {quiz.status === 1 ? "Active" : "Inactive"}
            </Badge>
            {quiz.therapistId && (
              <Badge variant="outline">
                Therapist ID: {quiz.therapistId}
              </Badge>
            )}
          </div>

          <CardTitle className="text-3xl">{quiz.title}</CardTitle>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{quiz.questionResponse ? quiz.questionResponse.length : 0} questions</span>
            </div>
          </div>

          <p className="text-muted-foreground">{quiz.description}</p>
        </CardHeader>

        <CardContent className="space-y-8">
          {quiz.questionResponse && quiz.questionResponse.length > 0 ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Questions Preview</h2>
              <div className="space-y-6">
                {quiz.questionResponse.map((question, index) => (
                  <div key={question.id} className="space-y-3">
                    <h3 className="font-medium">
                      Question {index + 1}: {question.content}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {question.optionResponse && question.optionResponse.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className="p-3 bg-muted rounded-lg text-sm text-muted-foreground"
                        >
                          {option.content}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No questions available for this quiz.</p>
            </div>
          )}

          <div className="flex justify-center pt-4">
            <Button
              onClick={() => navigate(`/quizzes/${quiz.id}/questions`)}
              className="gap-2"
              size="lg"
              disabled={!quiz.questionResponse || quiz.questionResponse.length === 0}
            >
              Start Quiz
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizDetails;
