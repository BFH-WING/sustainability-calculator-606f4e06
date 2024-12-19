import { QuizResults as QuizResultsType } from "../types/quiz";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface QuizResultsProps {
  results: QuizResultsType;
  onRestart: () => void;
}

const QuizResults = ({ results, onRestart }: QuizResultsProps) => {
  const maxScore = 50; // Maximum possible score
  const score = results.total;
  const percentage = (score / maxScore) * 100;

  const getFeedback = () => {
    if (percentage <= 30) return "Excellent! You're living very sustainably!";
    if (percentage <= 60) return "Good job! There's room for improvement.";
    return "Consider making some changes to live more sustainably.";
  };

  return (
    <Card className="w-full max-w-2xl mx-auto animate-fadeIn">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-eco-dark">
          Your Sustainability Score
        </CardTitle>
        <CardDescription className="text-center">
          {getFeedback()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-eco-primary mb-2">
              {Math.round(percentage)}%
            </div>
            <Progress value={percentage} className="h-2 bg-eco-light" />
          </div>

          <div className="space-y-4">
            {Object.entries(results).map(([key, value]) => {
              if (key === "total") return null;
              return (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{key.replace("-", " ")}</span>
                    <span className="text-eco-primary font-semibold">
                      {value} points
                    </span>
                  </div>
                  <Progress
                    value={(value / 10) * 100}
                    className="h-1.5 bg-eco-light"
                  />
                </div>
              );
            })}
          </div>

          <Button
            onClick={onRestart}
            className="w-full mt-6 bg-eco-primary hover:bg-eco-dark"
          >
            Take Quiz Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizResults;