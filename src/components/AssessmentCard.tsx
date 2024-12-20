import { format, formatDistanceToNow } from "date-fns";
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";
import RadarChart from "./RadarChart";
import CircularityLevel from "./CircularityLevel";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./ui/hover-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
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
            <span className="text-gray-600">
              {formatDistanceToNow(new Date(attempt.created_at), { addSuffix: true })}
            </span>
            <span className="text-gray-400 text-sm ml-1">
              ({format(new Date(attempt.created_at), "PPP")})
            </span>
          </p>
          <HoverCard>
            <HoverCardTrigger>
              <div className="cursor-help">
                <CircularityLevel score={attempt.total_score} />
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="icon"
              className="h-7 w-7"
              disabled={isDeletingId === attempt.id}
            >
              <Trash2Icon className="h-3.5 w-3.5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Assessment</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this assessment? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => onDelete(attempt.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      
      <div className="h-[200px]">
        <RadarChart data={radarData} color="#4CAF50" />
      </div>
    </div>
  );
};

export default AssessmentCard;