import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const TakeQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  // Sample quiz data - replace with your actual data or pass as prop
  const quizData = {
    title: "Relationship Communication Style",
    questions: [
      {
        id: 1,
        question:
          "When facing a disagreement with your partner, you typically:",
        options: [
          "Express your feelings immediately and directly",
          "Take time to process before discussing",
          "Try to find a compromise right away",
          "Seek advice from others first",
        ],
      },
      {
        id: 2,
        question: "In emotional conversations, you find yourself:",
        options: [
          "Speaking more than listening",
          "Listening more than speaking",
          "Balancing speaking and listening equally",
          "Struggling to express your thoughts",
        ],
      },
      {
        id: 3,
        question: "Your preferred way of resolving conflicts is:",
        options: [
          "Having a deep discussion until resolved",
          "Taking breaks and discussing gradually",
          "Finding quick practical solutions",
          "Writing down thoughts before talking",
        ],
      },
    ],
  };

  const handleOptionSelect = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
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
    // Handle quiz submission logic here
    navigate(`/quizzes/${id}/result`);
  };

  const currentQuestionData = quizData.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quizData.questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">{quizData.title}</CardTitle>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {quizData.questions.length}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%`,
              }}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">
              {currentQuestionData.question}
            </h3>

            <div className="space-y-3">
              {currentQuestionData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleOptionSelect(currentQuestionData.id, option)
                  }
                  className={`w-full p-4 text-left rounded-lg border transition-all
                    ${
                      answers[currentQuestionData.id] === option
                        ? "border-primary bg-primary/10"
                        : "border-gray-200 hover:border-primary/50"
                    }`}
                >
                  {option}
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
