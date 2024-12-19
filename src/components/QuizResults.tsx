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
import { Award, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface QuizResultsProps {
  results: QuizResultsType;
  onRestart: () => void;
}

const QuizResults = ({ results, onRestart }: QuizResultsProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const maxScore = 50;
  const score = results.total;
  const percentage = (score / maxScore) * 100;

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const getCircularityLevel = (score: number) => {
    if (score <= 1) return { level: "Low Circularity", color: "bg-red-500" };
    if (score <= 2) return { level: "Emerging Circularity", color: "bg-orange-500" };
    if (score <= 3) return { level: "Developing Circularity", color: "bg-yellow-500" };
    if (score <= 4) return { level: "Advanced Circularity", color: "bg-blue-500" };
    return { level: "Circular Leader", color: "bg-eco-primary" };
  };

  const circularityInfo = getCircularityLevel(score);

  const getFeedback = () => {
    if (percentage <= 30) return "Excellent! You're living very sustainably!";
    if (percentage <= 60) return "Good job! There's room for improvement.";
    return "Consider making some changes to live more sustainably.";
  };

  return (
    <Card className="w-full max-w-2xl mx-auto animate-fadeIn relative overflow-hidden">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          <Sparkles className="w-8 h-8 text-eco-primary absolute animate-bounce top-4 left-1/4" />
          <Sparkles className="w-8 h-8 text-eco-accent absolute animate-bounce top-8 right-1/4" />
          <Sparkles className="w-8 h-8 text-eco-secondary absolute animate-bounce top-6 left-3/4" />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl text-center text-eco-dark flex items-center justify-center gap-2">
          <Award className="w-8 h-8 text-eco-primary" />
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
              {score.toFixed(1)} / {maxScore}
            </div>
            <Progress value={percentage} className="h-2 bg-eco-light" />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="text-center mb-4">
              <div className="text-lg font-semibold mb-1">You are in a state of</div>
              <div className={`text-2xl font-bold ${circularityInfo.color.replace('bg-', 'text-')}`}>
                {circularityInfo.level}
              </div>
            </div>
            
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute inset-0 flex">
                <div className="w-1/5 bg-red-500" />
                <div className="w-1/5 bg-orange-500" />
                <div className="w-1/5 bg-yellow-500" />
                <div className="w-1/5 bg-blue-500" />
                <div className="w-1/5 bg-eco-primary" />
              </div>
              <div 
                className="absolute w-3 h-6 bg-black top-1/2 -translate-y-1/2 transform -translate-x-1/2"
                style={{ left: `${(score / 5) * 100}%` }}
              />
            </div>
            
            <div className="flex justify-between text-xs mt-1 px-1">
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(results).map(([key, value]) => {
              if (key === "total") return null;
              return (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{key.replace("-", " ")}</span>
                    <span className="text-eco-primary font-semibold">
                      {value.toFixed(1)} points
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