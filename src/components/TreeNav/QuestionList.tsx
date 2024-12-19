import { cn } from "@/lib/utils";
import { Question } from "@/types/quiz";

interface QuestionListProps {
  questions: Question[];
  sectionIndex: number;
  currentSectionIndex: number;
  currentQuestionIndex: number;
  answers: { [key: string]: number };
  onQuestionSelect: (sectionIndex: number, questionIndex: number) => void;
  canNavigate: boolean;
  questionErrors?: { [key: string]: boolean };
}

const QuestionList = ({
  questions,
  sectionIndex,
  currentSectionIndex,
  currentQuestionIndex,
  answers,
  onQuestionSelect,
  canNavigate,
  questionErrors,
}: QuestionListProps) => (
  <ul className="space-y-1 pl-4">
    {questions.map((question, qIndex) => {
      const isAnswered = answers[question.id] !== undefined;
      const isCurrent = currentSectionIndex === sectionIndex && currentQuestionIndex === qIndex;
      const hasError = questionErrors?.[question.id];
      const score = answers[question.id];

      return (
        <li key={question.id} className="text-sm">
          <button
            onClick={() => canNavigate && onQuestionSelect(sectionIndex, qIndex)}
            className={cn(
              "text-left w-full px-2 py-1 rounded",
              isCurrent && "bg-eco-light text-eco-dark font-medium",
              !isCurrent && canNavigate && "hover:bg-gray-50",
              hasError && "text-red-500",
              !canNavigate && "cursor-not-allowed"
            )}
            disabled={!canNavigate}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <span className="mr-2">{isAnswered ? "✓" : "○"}</span>
                <span className="truncate">{question.text}</span>
              </span>
              {isAnswered && (
                <span className="ml-2 text-xs text-gray-500">
                  {score.toFixed(1)}% (w: {question.weight})
                </span>
              )}
            </div>
          </button>
        </li>
      );
    })}
  </ul>
);

export default QuestionList;