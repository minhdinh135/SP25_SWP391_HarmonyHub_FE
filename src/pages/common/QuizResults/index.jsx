import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2 } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [resultData, setResultData] = useState(null);

  const letters = ["A", "B", "C", "D"];

  useEffect(() => {
    if (location.state) {
      setResultData(location.state);
    } else {
      // Redirect to quiz list if no result data is available
      navigate("/quizzes");
    }
  }, [location, navigate]);

  if (!resultData) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      </div>
    );
  }

  const { quizTitle, mostFrequentType, typeCounts, resultResponse } =
    resultData;

  // Find the result that matches the most frequent type
  const mainResult = resultResponse.find(
    (result) => result.type === mostFrequentType,
  ) || {
    type: 0,
    content: "Mixed Result - Your answers were quite varied!",
  };

  // Create a map of all result types to their contents
  const resultMap = resultResponse.reduce((acc, result) => {
    acc[result.type] = result.content;
    return acc;
  }, {});

  // Convert type to letter
  const getLetterForType = (type) => {
    const index = type - 1;
    return index >= 0 && index < letters.length ? letters[index] : "";
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

      <Card className="w-full mb-8">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl">{quizTitle} - Your Result</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-primary/10 p-6 text-center">
            <h2 className="text-xl font-bold text-primary mb-2">
              You chose mostly {getLetterForType(mostFrequentType)}
            </h2>
            <p>{mainResult.content}</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg">Your Answer Breakdown</h3>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((type) => (
                <div key={type} className="text-center">
                  <div className="w-full aspect-square flex items-center justify-center bg-muted rounded-md mb-1">
                    <span className="text-xl font-bold">
                      {getLetterForType(type)}
                    </span>
                  </div>
                  <div className="text-sm font-medium">
                    {typeCounts[type] || 0}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="font-medium text-lg">All Possible Results</h3>
            <div className="space-y-4">
              {resultResponse.map((result) => (
                <div
                  key={result.id}
                  className={`p-4 rounded-lg border ${mostFrequentType === result.type ? "border-primary bg-primary/5" : ""}`}
                >
                  <h4 className="font-medium flex items-center gap-2">
                    <span className="inline-block w-6 h-6 rounded-full bg-primary/20 text-primary text-center">
                      {getLetterForType(result.type)}
                    </span>
                    If you chose mostly {getLetterForType(result.type)}
                  </h4>
                  <p className="text-sm mt-1">{result.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              onClick={() => navigate(`/quizzes/${id}`)}
              variant="outline"
              className="w-full"
            >
              Quiz Details
            </Button>
            <Button className="w-full gap-2">
              <Share2 className="w-4 h-4" />
              Share Result
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizResult;
