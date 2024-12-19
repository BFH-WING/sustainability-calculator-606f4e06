import { BadgePercent } from "lucide-react";

interface CircularityLevelProps {
  score: number;
}

const CircularityLevel = ({ score }: CircularityLevelProps) => {
  const getLevel = (score: number) => {
    if (score < 20) return { text: "Low Circularity", color: "text-red-600" };
    if (score < 40) return { text: "Emerging Circularity", color: "text-orange-500" };
    if (score < 60) return { text: "Developing Circularity", color: "text-yellow-500" };
    if (score < 80) return { text: "Advanced Circularity", color: "text-green-500" };
    return { text: "Circular Leader", color: "text-eco-primary" };
  };

  const level = getLevel(score);

  return (
    <div className="flex items-center gap-2 mb-6">
      <BadgePercent className="h-6 w-6" />
      <span className="text-lg font-medium">{score}% - </span>
      <span className={`text-lg font-semibold ${level.color}`}>{level.text}</span>
    </div>
  );
};

export default CircularityLevel;