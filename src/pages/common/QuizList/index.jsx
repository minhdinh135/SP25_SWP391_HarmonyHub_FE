import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const quizzes = [
  {
    id: 1,
    title: "Relationship Communication Style",
    description: "Discover your primary communication style in relationships",
    questions: 10,
    timeEstimate: "5-10 mins",
    participants: 1240,
    image:
      "https://media.proprofs.com/images/QM/user_images/1717498/1528190966.jpg",
    categories: ["Communication", "Self-Discovery"],
  },
  {
    id: 2,
    title: "Conflict Resolution Pattern",
    description: "Learn how you typically handle relationship conflicts",
    questions: 12,
    timeEstimate: "8-12 mins",
    participants: 890,
    image:
      "https://media.proprofs.com/images/QM/user_images/1717498/1561022582.jpg",
    categories: ["Conflict", "Behavior"],
  },
  // Add more quizzes as needed
];

// Quiz List Component
const QuizList = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Relationship Quizzes</h1>
          <p className="text-muted-foreground mt-2">
            Discover more about yourself and your relationship patterns
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/quizzes/${quiz.id}`)}
            >
              <img
                src={quiz.image}
                alt={quiz.title}
                className="w-full h-48 object-cover"
              />
              <CardHeader className="space-y-1">
                <div className="flex flex-wrap gap-2">
                  {quiz.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-xl">{quiz.title}</CardTitle>
                <p className="text-muted-foreground text-sm">
                  {quiz.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{quiz.timeEstimate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{quiz.participants.toLocaleString()} taken</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizList;
