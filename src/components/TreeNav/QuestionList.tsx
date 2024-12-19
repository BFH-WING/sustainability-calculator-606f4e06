import { cn } from "@/lib/utils";
import { QuizQuestion } from "@/types/quiz";

interface QuestionListProps {
  questions: QuizQuestion[];
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

      return (
        <li key={question.id}>
          <button
            onClick={() => canNavigate && onQuestionSelect(sectionIndex, qIndex)}
            className={cn(
              "text-left w-full px-2 py-1 rounded text-sm",
              isCurrent && "bg-eco-light text-eco-dark font-medium",
              !isCurrent && canNavigate && "hover:bg-gray-50",
              hasError && "text-red-500",
              !canNavigate && "cursor-not-allowed"
            )}
            disabled={!canNavigate}
          >
            <span className="flex items-center">
              <span className="mr-2">{isAnswered ? "✓" : "○"}</span>
              {question.text}
            </span>
          </button>
        </li>
      );
    })}
  </ul>
);

export default QuestionList;