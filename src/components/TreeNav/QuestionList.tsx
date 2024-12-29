import { cn } from "@/lib/utils";
import { QuizSection } from "@/types/quiz";
import { useEffect, useState } from "react";
import { databases } from "@/integrations/appwrite/client";

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
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    const fetchDebugMode = async () => {
      try {
        const response = await databases.getDocument(
          'sustainability_calculator',  // This is the correct database ID
          'global_settings',           // Collection ID
          'debug_mode'                 // Document ID
        );

        if (response) {
          setDebugMode(response.value === true);
        }
      } catch (error) {
        console.error("Error fetching debug mode:", error);
      }
    };

    fetchDebugMode();
  }, []);

  return (
    <div className="space-y-6">
      {sections.map((section, sectionIndex) => (
        <div key={section.id} className="space-y-2">
          <h3 className="font-medium text-gray-900">{section.title}</h3>
          <ul className="space-y-1 pl-4">
            {section.questions.map((question, qIndex) => {
              const isAnswered = answers[question.id] !== undefined;
              const isCurrent = currentSectionIndex === sectionIndex && currentQuestionIndex === qIndex;
              const hasError = questionErrors?.[question.id];
              const score = answers[question.id];
              const canNavigate = canNavigateToSection(sectionIndex);

              return (
                <li key={question.id} className="text-sm">
                  <button
                    onClick={() => canNavigate && onQuestionSelect(sectionIndex, qIndex)}
                    className={cn(
                      "text-left w-full px-2 py-1 rounded",
                      isCurrent && "bg-eco-light text-eco-dark font-medium",
                      !isCurrent && canNavigate && "hover:bg-gray-50",
                      hasError && "text-red-500",
                      !canNavigate && "cursor-not-allowed opacity-50"
                    )}
                    disabled={!canNavigate}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center min-w-0 flex-1">
                        <span className="mr-2 flex-shrink-0">{isAnswered ? "✓" : "○"}</span>
                        <span className="truncate max-w-[calc(100%-80px)]">{question.text}</span>
                      </span>
                      {isAnswered && debugMode && (
                        <span className="text-xs font-medium bg-gray-100 px-2 py-0.5 rounded whitespace-nowrap flex-shrink-0">
                          {score.toFixed(1)}% (w: {question.weight})
                        </span>
                      )}
                    </div>
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