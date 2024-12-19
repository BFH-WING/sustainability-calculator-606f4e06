import { QuizSection } from "@/types/quiz";
import { Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionListProps {
  sections: QuizSection[];
  currentSectionIndex: number;
  currentQuestionIndex: number;
  answers: { [key: string]: number };
  onQuestionSelect: (sectionIndex: number, questionIndex: number) => void;
  canNavigateToSection: (sectionIndex: number) => boolean;
  questionErrors?: { [key: string]: boolean };
}

const QuestionList = ({
  sections,
  currentSectionIndex,
  currentQuestionIndex,
  answers,
  onQuestionSelect,
  canNavigateToSection,
  questionErrors,
}: QuestionListProps) => {
  return (
    <div className="space-y-6">
      {sections.map((section, sectionIndex) => (
        <div key={section.id} className="space-y-2">
          <h3 className="font-medium text-gray-900 pl-2">{section.title}</h3>
          <ul className="space-y-1">
            {section.questions.map((question, qIndex) => {
              const isAnswered = answers[question.id] !== undefined;
              const isCurrent =
                sectionIndex === currentSectionIndex &&
                qIndex === currentQuestionIndex;
              const hasError = questionErrors?.[question.id];
              const isClickable = canNavigateToSection(sectionIndex);

              return (
                <li key={question.id}>
                  <button
                    onClick={() => onQuestionSelect(sectionIndex, qIndex)}
                    disabled={!isClickable}
                    className={cn(
                      "w-full text-left px-2 py-1 rounded flex items-center text-sm",
                      isCurrent && "bg-eco-light text-eco-primary font-medium",
                      !isClickable && "opacity-50 cursor-not-allowed",
                      isClickable &&
                        !isCurrent &&
                        "hover:bg-eco-light/50 transition-colors"
                    )}
                  >
                    <div className="w-5 h-5 mr-2 flex-shrink-0">
                      {hasError ? (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      ) : isAnswered ? (
                        <Check className="w-5 h-5 text-eco-primary" />
                      ) : null}
                    </div>
                    <span
                      className={cn(
                        "flex-1",
                        hasError && "text-red-500",
                        isAnswered && !isCurrent && "text-eco-primary"
                      )}
                    >
                      {question.text}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;