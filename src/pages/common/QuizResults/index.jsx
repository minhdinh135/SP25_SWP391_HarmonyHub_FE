import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Share2 } from "lucide-react";

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get answers from location state
  const { answers = {}, quizTitle } = location.state || {};

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://sp25-swp391-harmonyhub-be.onrender.com/api/quizzes");

        if (response.ok) {
          const result = await response.json();
          const selectedQuiz = result.data.find(q => q.id === parseInt(id));
          if (selectedQuiz) {
            setQuiz(selectedQuiz);
          }
        }
      } catch (error) {
        console.error("Failed to fetch quiz data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [id]);

  // Calculate results
  const calculateResults = () => {
    if (!quiz || !quiz.questionResponse) return null;

    // Count the total questions and answered questions
    const totalQuestions = quiz.questionResponse.length;
    const answeredQuestions = Object.keys(answers).length;

    // Get all answers selected
    const selectedAnswers = Object.entries(answers).map(([questionId, answer]) => {
      const question = quiz.questionResponse.find(q => q.id === parseInt(questionId));
      return {
        questionId: parseInt(questionId),
        questionText: question ? question.content : "",
        answer
      };
    });

    return {
      totalQuestions,
      answeredQuestions,
      selectedAnswers,
      completionPercentage: Math.round((answeredQuestions / totalQuestions) * 100)
    };
  };

  const results = calculateResults();

  // Generate a simple personality type based on answers
  const generatePersonalityType = () => {
    if (!answers || Object.keys(answers).length === 0) return "Unknown";

    // This is a simplified example - you would likely have more complex logic
    // based on your specific quiz questions and scoring system
    const answerValues = Object.values(answers);

    // Check for patterns in answers (very simplified)
    if (answerValues.some(answer => answer.includes("immediately") || answer.includes("directly"))) {
      return "Direct Communicator";
    } else if (answerValues.some(answer => answer.includes("listen") || answer.includes("process"))) {
      return "Thoughtful Communicator";
    } else if (answerValues.some(answer => answer.includes("compromise") || answer.includes("balance"))) {
      return "Balanced Communicator";
    } else {
      return "Adaptive Communicator";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Calculating your results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
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

      <Card className="mb-6">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Your Results</CardTitle>
          <CardDescription>
            Based on your answers to the "{quizTitle || quiz?.title}" quiz
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Your Communication Type</h3>
            <p className="text-lg font-medium text-primary">
              {generatePersonalityType()}
            </p>
          </div>

          {results && (
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Quiz Completion</span>
                <span>{results.completionPercentage}%</span>
              </div>

              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full"
                  style={{ width: `${results.completionPercentage}%` }}
                />
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h3 className="font-medium">What this means:</h3>
            <p className="text-muted-foreground">
              As a {generatePersonalityType()}, you tend to approach relationship communication with a focus on
              {generatePersonalityType().includes("Direct")
                ? " expressing your thoughts clearly and promptly. You value honesty and straightforwardness in your interactions."
                : generatePersonalityType().includes("Thoughtful")
                  ? " understanding and processing information before responding. You value depth and careful consideration in your interactions."
                  : generatePersonalityType().includes("Balanced")
                    ? " finding middle ground and ensuring mutual understanding. You value harmony and fairness in your interactions."
                    : " adapting to the situation and the needs of others. You value flexibility and responsiveness in your interactions."}
            </p>

            <h3 className="font-medium mt-4">Strengths:</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              {generatePersonalityType().includes("Direct") ? (
                <>
                  <li>You're clear about your needs and feelings</li>
                  <li>Others know where they stand with you</li>
                  <li>You resolve issues efficiently</li>
                </>
              ) : generatePersonalityType().includes("Thoughtful") ? (
                <>
                  <li>You're a great listener</li>
                  <li>You process information deeply</li>
                  <li>You make well-considered decisions</li>
                </>
              ) : generatePersonalityType().includes("Balanced") ? (
                <>
                  <li>You're good at finding compromise</li>
                  <li>You maintain harmony in relationships</li>
                  <li>You see multiple perspectives</li>
                </>
              ) : (
                <>
                  <li>You're flexible in different situations</li>
                  <li>You respond well to others' needs</li>
                  <li>You can adapt your communication style</li>
                </>
              )}
            </ul>

            <h3 className="font-medium mt-4">Growth Areas:</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              {generatePersonalityType().includes("Direct") ? (
                <>
                  <li>Sometimes you might come across as too blunt</li>
                  <li>You might benefit from more listening</li>
                  <li>Consider how your words impact others' feelings</li>
                </>
              ) : generatePersonalityType().includes("Thoughtful") ? (
                <>
                  <li>You might take too long to respond sometimes</li>
                  <li>Others may misinterpret your silence</li>
                  <li>Practice expressing yourself more directly</li>
                </>
              ) : generatePersonalityType().includes("Balanced") ? (
                <>
                  <li>You might avoid necessary conflict</li>
                  <li>Sometimes a clear stance is needed</li>
                  <li>Be careful not to compromise your own needs too much</li>
                </>
              ) : (
                <>
                  <li>You might not have a consistent communication style</li>
                  <li>Others may find you hard to predict</li>
                  <li>Develop clearer boundaries in communication</li>
                </>
              )}
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button onClick={() => navigate(`/quizzes/${id}/questions`)} variant="outline" className="w-full sm:w-auto">
            Take Quiz Again
          </Button>
          <Button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `My ${quizTitle || quiz?.title} Results`,
                  text: `I'm a ${generatePersonalityType()}! Take the quiz to discover your type.`,
                  url: window.location.href,
                })
                  .catch(err => console.log('Error sharing:', err));
              } else {
                // Fallback for browsers that don't support the Web Share API
                navigator.clipboard.writeText(window.location.href)
                  .then(() => alert('Link copied to clipboard!'))
                  .catch(err => console.log('Error copying link:', err));
              }
            }}
            className="w-full sm:w-auto gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share Results
          </Button>
        </CardFooter>
      </Card>

      {results && results.selectedAnswers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Answers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.selectedAnswers.map((item, index) => (
                <div key={item.questionId} className="border-b pb-3 last:border-none">
                  <p className="font-medium">Question {index + 1}: {item.questionText}</p>
                  <p className="text-muted-foreground mt-1">Your answer: {item.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuizResults;
