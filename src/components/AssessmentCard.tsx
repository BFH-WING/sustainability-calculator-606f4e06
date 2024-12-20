import { format } from "date-fns";
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";
import RadarChart from "./RadarChart";
import CircularityLevel from "./CircularityLevel";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./ui/hover-card";
import { QuizAttempt } from "@/types/dashboard";

interface AssessmentCardProps {
  attempt: QuizAttempt;
  onDelete: (id: string) => void;
  isDeletingId: string | null;
}

const AssessmentCard = ({ attempt, onDelete, isDeletingId }: AssessmentCardProps) => {
  const radarData = Object.entries(attempt.section_scores).map(([, data]) => ({
    subject: data.label,
    value: data.percentage,
  }));

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-500">
            {format(new Date(attempt.created_at), 'MMMM d, yyyy')}
          </p>
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex items-center gap-2 cursor-help">
                <span className="text-2xl font-bold text-eco-primary">
                  {attempt.total_score}%
                </span>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-3">
                {Object.entries(attempt.section_scores).map(([key, data]) => (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{data.label}</span>
                      <span className="font-medium">{data.percentage}%</span>
                    </div>
                    <div 
                      className="h-1.5 bg-gray-100 rounded-full overflow-hidden"
                      style={{
                        background: `linear-gradient(to right, #4CAF50 ${data.percentage}%, #e5e7eb 0%)`
                      }}
                    />
                  </div>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(attempt.id)}
          disabled={isDeletingId === attempt.id}
        >
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </div>

      <CircularityLevel score={attempt.total_score} />
      
      <div className="h-[200px]">
        <RadarChart data={radarData} color="#4CAF50" />
      </div>
    </div>
  );
};

export default AssessmentCard;