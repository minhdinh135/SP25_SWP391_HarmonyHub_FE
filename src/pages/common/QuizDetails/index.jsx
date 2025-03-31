import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "@/components/Spinner";
import { getQuizDetails } from "@/api/quizApi";
import { toast } from "sonner";

const QuizDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizDetails = async () => {
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

    fetchQuizDetails();
  }, [id]);

  // Function to get option letter based on type
  const getOptionLetter = (type) => {
    const letterMap = {
      1: "A",
      2: "B",
      3: "C",
      4: "D",
    };
    return letterMap[type] ? `${letterMap[type]}.` : "";
  };

  if (loading) return <Spinner />;

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
          <CardTitle className="text-3xl">{quiz.title}</CardTitle>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>
                {quiz.questionResponse ? quiz.questionResponse.length : 0}{" "}
                questions
              </span>
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
                      {question.optionResponse &&
                        // Sort options by type to ensure A, B, C, D order
                        [...question.optionResponse]
                          .sort((a, b) => a.type - b.type)
                          .map((option) => (
                            <div
                              key={option.id}
                              className="p-3 bg-muted rounded-lg text-sm flex"
                            >
                              <span className="font-medium mr-2">
                                {getOptionLetter(option.type)}
                              </span>
                              <span className="text-muted-foreground">
                                {option.content}
                              </span>
                            </div>
                          ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">
                No questions available for this quiz.
              </p>
            </div>
          )}

          <div className="flex justify-center pt-4">
            <Button
              onClick={() => navigate(`/quizzes/${quiz.id}/questions`)}
              className="gap-2"
              size="lg"
              disabled={
                !quiz.questionResponse || quiz.questionResponse.length === 0
              }
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
