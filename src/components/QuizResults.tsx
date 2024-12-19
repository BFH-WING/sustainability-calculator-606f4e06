import { QuizResults as QuizResultsType } from "../types/quiz";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import CircularityGauge from "./CircularityGauge";
import SectionScores from "./SectionScores";

interface QuizResultsProps {
  results: QuizResultsType;
  onRestart: () => void;
}

const SECTION_WEIGHTS = {
  "circular-design": { weight: 10, label: "Circular product development" },
  "material-sourcing": { weight: 8, label: "Circular sourcing" },
  "production": { weight: 8, label: "Circular production" },
  "end-of-life": { weight: 7, label: "Circular use and end-of-life" },
};

const GAUGE_COLORS = [
  "#ef4444", // red-500 - Low
  "#f97316", // orange-500 - Emerging
  "#eab308", // yellow-500 - Developing
  "#3b82f6", // blue-500 - Advanced
  "#22c55e", // green-500 - Leader
];

const QuizResults = ({ results, onRestart }: QuizResultsProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const calculateWeightedScore = () => {
    let totalWeight = 0;
    let weightedSum = 0;

    Object.entries(results).forEach(([key, value]) => {
      if (key !== "total" && SECTION_WEIGHTS[key]) {
        const weight = SECTION_WEIGHTS[key].weight;
        weightedSum += value * weight;
        totalWeight += weight;
      }
    });

    return totalWeight > 0 ? weightedSum / totalWeight : 0;
  };

  const score = calculateWeightedScore();

  const getCircularityLevel = (score: number) => {
    if (score <= 1) return { level: "Low Circularity", color: GAUGE_COLORS[0] };
    if (score <= 2) return { level: "Emerging Circularity", color: GAUGE_COLORS[1] };
    if (score <= 3) return { level: "Developing Circularity", color: GAUGE_COLORS[2] };
    if (score <= 4) return { level: "Advanced Circularity", color: GAUGE_COLORS[3] };
    return { level: "Circular Leader", color: GAUGE_COLORS[4] };
  };

  const circularityInfo = getCircularityLevel(score);

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
          Your Circularity Score
        </CardTitle>
        <CardDescription className="text-center text-lg">
          {circularityInfo.level}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <CircularityGauge score={score} colors={GAUGE_COLORS} />
          
          <SectionScores 
            results={results}
            sectionWeights={SECTION_WEIGHTS}
            gaugeColor={circularityInfo.color}
          />

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