import { Alert, AlertDescription } from "@/components/ui/alert";

interface SectionScore {
  score: number;
  maxScore: number;
  answeredCount: number;
  totalQuestions: number;
  percentage: number;
}

interface SectionDebugInfoProps {
  sectionScore: SectionScore;
}

const SectionDebugInfo = ({ sectionScore }: SectionDebugInfoProps) => (
  <Alert className="mb-2 bg-gray-50">
    <AlertDescription className="font-mono text-xs space-y-1">
      <div>Questions answered: {sectionScore.answeredCount}/{sectionScore.totalQuestions}</div>
      <div>Current score: {sectionScore.percentage.toFixed(1)}%</div>
      <div>Questions completed: {Math.round((sectionScore.answeredCount / sectionScore.totalQuestions) * 100)}%</div>
    </AlertDescription>
  </Alert>
);

export default SectionDebugInfo;