import { getAllQuizzes } from "@/api/quizApi";
import Spinner from "@/components/Spinner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Clock } from "lucide-react";
import { useEffect, useState } from "react";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizResult, setQuizResult] = useState(null);
  const [isQuizActive, setIsQuizActive] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const response = await getAllQuizzes();

        const activeQuizzes = response.filter((quiz) => quiz.status === 1);
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

  // Start the quiz
  const handleStartQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setQuizResult(null);
    setIsQuizActive(true);
  };

  // Handle user selecting an answer
  const handleAnswerSelect = (optionType) => {
    // Add the answer to userAnswers
    const newAnswers = [...userAnswers, optionType];
    setUserAnswers(newAnswers);

    // Move to next question or show result if quiz is complete
    if (currentQuestion < currentQuiz.questionResponse.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz is complete, calculate result
      calculateResult(newAnswers);
    }
  };

  // Calculate the most common answer type and set result
  const calculateResult = (answers) => {
    // Count occurrences of each answer type
    const typeCounts = answers.reduce((counts, type) => {
      counts[type] = (counts[type] || 0) + 1;
      return counts;
    }, {});

    // Find the most common answer type
    let mostCommonType = 0;
    let highestCount = 0;

    Object.entries(typeCounts).forEach(([type, count]) => {
      if (count > highestCount) {
        highestCount = count;
        mostCommonType = parseInt(type, 10);
      }
    });

    // Find the result that matches the most common type
    const matchingResult = currentQuiz.resultResponse.find(
      (result) => result.type === mostCommonType,
    );

    setQuizResult(
      matchingResult || { content: "No result found for your answers." },
    );
  };

  // Reset the quiz state to return to quiz list
  const handleBackToList = () => {
    setCurrentQuiz(null);
    setIsQuizActive(false);
    setUserAnswers([]);
    setQuizResult(null);
  };

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-destructive/10 p-4 rounded-md flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-destructive">
              Error loading quizzes
            </h3>
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

  // Render quiz questions and options
  const renderQuizQuestion = () => {
    if (
      !currentQuiz ||
      !currentQuiz.questionResponse ||
      currentQuiz.questionResponse.length === 0
    ) {
      return <p>No questions found for this quiz.</p>;
    }

    const question = currentQuiz.questionResponse[currentQuestion];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">{currentQuiz.title}</h2>
          <div className="bg-muted p-4 rounded-md mb-6">
            <p className="text-lg font-medium">
              Question {currentQuestion + 1} of{" "}
              {currentQuiz.questionResponse.length}
            </p>
            <p className="text-xl mt-2">{question.content}</p>
          </div>
        </div>

        <div className="space-y-3">
          {question.optionResponse.map((option, index) => (
            <button
              key={index}
              className="w-full p-4 border rounded-md hover:bg-primary/10 text-left transition-colors"
              onClick={() => handleAnswerSelect(option.type)}
            >
              {option.content}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Render quiz result
  const renderQuizResult = () => {
    if (!quizResult) {
      return <p>Calculating your result...</p>;
    }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {currentQuiz.title} - Your Result
          </h2>
        </div>

        <div className="bg-primary/10 p-6 rounded-md">
          <h3 className="text-xl font-semibold mb-4">
            Your Relationship Analysis
          </h3>
          <p className="text-lg mb-4">{quizResult.content}</p>
        </div>

        <button
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          onClick={handleBackToList}
        >
          Back to Quizzes
        </button>
      </div>
    );
  };

  // If a quiz is active, show the quiz or result
  if (isQuizActive) {
    return (
      <div className="container mx-auto px-4 py-8">
        {quizResult ? renderQuizResult() : renderQuizQuestion()}
      </div>
    );
  }

  // Otherwise, show the quiz list
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
            <p className="text-muted-foreground">
              No active quizzes available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card
                key={quiz.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleStartQuiz(quiz)}
              >
                <img
                  src={quiz.imageUrl}
                  alt={quiz.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/600x400?text=Quiz+Image";
                  }}
                />
                <CardHeader className="space-y-1">
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
                      <Badge variant="outline" className="bg-green-50">
                        Active
                      </Badge>
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
