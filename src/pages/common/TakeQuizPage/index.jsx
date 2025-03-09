import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const TakeQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://sp25-swp391-harmonyhub-be.onrender.com/api/quizzes");

        if (!response.ok) {
          throw new Error("Failed to fetch quiz data");
        }

        const result = await response.json();
        const selectedQuiz = result.data.find(q => q.id === parseInt(id));

        if (!selectedQuiz) {
          throw new Error("Quiz not found");
        }

        if (!selectedQuiz.questionResponse || selectedQuiz.questionResponse.length === 0) {
          throw new Error("This quiz has no questions");
        }

        setQuiz(selectedQuiz);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching quiz data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [id]);

  const handleOptionSelect = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questionResponse.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Quiz submitted with answers:", answers);
    // Here you would typically send the answers to your backend
    // For now, we'll just navigate to a result page
    navigate(`/quizzes/${id}/result`, {
      state: {
        answers,
        quizTitle: quiz.title,
        quizId: quiz.id
      }
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(`/quizzes/${id}`)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Quiz Details
          </Button>
        </div>
        <div className="bg-destructive/10 p-4 rounded-md flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-destructive">Error</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
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

  const currentQuestionData = quiz.questionResponse[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questionResponse.length - 1;
  const isFirstQuestion = currentQuestion === 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(`/quizzes/${id}`)}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Quiz Details
        </Button>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">{quiz.title}</CardTitle>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {quiz.questionResponse.length}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / quiz.questionResponse.length) * 100}%`,
              }}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">
              {currentQuestionData.content}
            </h3>

            <div className="space-y-3">
              {currentQuestionData.optionResponse.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(currentQuestionData.id, option.content)}
                  className={`w-full p-4 text-left rounded-lg border transition-all
                    ${answers[currentQuestionData.id] === option.content
                      ? "border-primary bg-primary/10"
                      : "border-gray-200 hover:border-primary/50"
                    }`}
                >
                  {option.content}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstQuestion}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            {isLastQuestion ? (
              <Button
                onClick={handleSubmit}
                disabled={!answers[currentQuestionData.id]}
                className="gap-2"
              >
                Submit Quiz
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!answers[currentQuestionData.id]}
                className="gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TakeQuiz;
