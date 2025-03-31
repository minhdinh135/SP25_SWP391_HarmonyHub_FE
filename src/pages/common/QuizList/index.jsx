import { getAllQuizzes } from "@/api/quizApi";
import Spinner from "@/components/Spinner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizStatus } from "@/constants/status";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const QuizList = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const response = await getAllQuizzes();

        const activeQuizzes = response.filter(
          (quiz) => quiz.status === QuizStatus.Active,
        );
        setQuizzes(activeQuizzes);
      } catch (err) {
        console.log(err);
        toast.error("Error loading quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) return <Spinner />;

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
                onClick={() => navigate(`/quizzes/${quiz.id}`)}
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
