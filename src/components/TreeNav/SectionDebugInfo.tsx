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
      <div>Questions: {sectionScore.answeredCount}/{sectionScore.totalQuestions}</div>
      <div>Section Score: {sectionScore.percentage.toFixed(1)}%</div>
      <div>Completion: {Math.round((sectionScore.answeredCount / sectionScore.totalQuestions) * 100)}%</div>
    </AlertDescription>
  </Alert>
);

export default SectionDebugInfo;