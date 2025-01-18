import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

// Sample quiz data - replace with your actual data
const quizData = {
  id: 1,
  title: "Relationship Communication Style",
  description:
    "Discover your primary communication style and learn how it affects your relationships. This assessment will help you understand your natural tendencies in communication and provide insights into how you can improve your relationship dialogue.",
  timeEstimate: "5-10 mins",
  participants: 1240,
  image:
    "https://media.proprofs.com/images/QM/user_images/1717498/1528190966.jpg",
  categories: ["Communication", "Self-Discovery"],
  questions: [
    {
      id: 1,
      question: "When facing a disagreement with your partner, you typically:",
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

const QuizDetails = () => {
  const navigate = useNavigate();

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
            src={quizData.image}
            alt={quizData.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <CardHeader className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {quizData.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>

          <CardTitle className="text-3xl">{quizData.title}</CardTitle>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{quizData.timeEstimate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{quizData.participants.toLocaleString()} taken</span>
            </div>
          </div>

          <p className="text-muted-foreground">{quizData.description}</p>
        </CardHeader>

        <CardContent className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Questions Preview</h2>
            <div className="space-y-6">
              {quizData.questions.map((question, index) => (
                <div key={question.id} className="space-y-3">
                  <h3 className="font-medium">
                    Question {index + 1}: {question.question}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className="p-3 bg-muted rounded-lg text-sm text-muted-foreground"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={() => navigate(`questions`)}
              className="gap-2"
              size="lg"
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
