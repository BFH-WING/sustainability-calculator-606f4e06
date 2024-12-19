import { QuizSection } from "../types/quiz";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface QuizProgressProps {
  sections: QuizSection[];
  currentSectionIndex: number;
  currentQuestionIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  canGoNext: boolean;
}

const QuizProgress = ({ 
  sections, 
  currentSectionIndex,
  currentQuestionIndex,
  onPrevious,
  onNext,
  canGoNext
}: QuizProgressProps) => {
  const currentSection = sections[currentSectionIndex];
  const totalQuestions = currentSection.questions.length;
  const isFirstQuestion = currentQuestionIndex === 0 && currentSectionIndex === 0;
  const isLastSection = currentSectionIndex === sections.length - 1;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="w-full mb-8 space-y-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </span>
        <span className="text-sm text-eco-primary font-medium">
          Section {currentSectionIndex + 1} of {sections.length}
        </span>
      </div>
      <div className="h-2 bg-eco-light rounded-full overflow-hidden">
        <div
          className="h-full bg-eco-primary transition-all duration-300"
          style={{
            width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
          }}
        />
      </div>
      <div className="flex justify-between items-center pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevious}
          disabled={isFirstQuestion}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={!canGoNext}
          className="flex items-center gap-2"
        >
          {isLastQuestion && isLastSection ? "Complete" : "Next"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default QuizProgress;