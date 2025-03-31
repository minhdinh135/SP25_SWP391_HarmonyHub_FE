import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizDetails } from "@/api/quizApi";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";

const TakeQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const letters = ["A", "B", "C", "D"];

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        const data = await getQuizDetails(id);
        setQuiz(data);
      } catch (err) {
        console.log(err);
        toast.error("Error fetching quiz details");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [id]);

  const handleOptionSelect = (questionId, option) => {
    // Store the option's type instead of the letter index
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option.type,
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
    // Count the number of each type selected
    const counts = Object.values(answers).reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    // Find the most frequently selected type
    let maxCount = 0;
    let mostFrequentType = null;

    for (const [type, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        mostFrequentType = Number(type); // Convert string to number
      }
    }

    console.log("Quiz submitted with type counts:", counts);
    console.log("Most frequent type:", mostFrequentType);

    // Navigate to results page with type counts and most frequent type
    navigate(`/quizzes/${id}/result`, {
      state: {
        answers,
        typeCounts: counts,
        mostFrequentType,
        quizTitle: quiz.title,
        quizId: quiz.id,
        resultResponse: quiz.resultResponse,
      },
    });
  };

  if (loading) return <Spinner />;

  const currentQuestionData = quiz.questionResponse[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questionResponse.length - 1;
  const isFirstQuestion = currentQuestion === 0;

  // Find the letter that corresponds to each option based on type
  const getLetterForType = (type) => {
    const index = letters.findIndex((_, i) => i + 1 === type);
    return index >= 0 ? letters[index] : "";
  };

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
              {currentQuestionData.optionResponse.map((option) => {
                const letter = getLetterForType(option.type);
                return (
                  <button
                    key={option.id}
                    onClick={() =>
                      handleOptionSelect(currentQuestionData.id, option)
                    }
                    className={`w-full p-4 text-left rounded-lg border transition-all flex items-start gap-3
                      ${
                        answers[currentQuestionData.id] === option.type
                          ? "border-primary bg-primary/10"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                  >
                    <span className="font-medium text-primary w-6">
                      {letter}.
                    </span>
                    <span className="flex-1">{option.content}</span>
                  </button>
                );
              })}
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
