import { cn } from "@/lib/utils";
import { QuizSection } from "@/types/quiz";
import { useEffect, useState } from "react";
import { databases, DATABASE_ID, COLLECTIONS } from "@/integrations/appwrite/client";
import { Query } from "appwrite";

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
        console.log('Fetching debug mode setting...');
        const documents = await databases.listDocuments(
          DATABASE_ID,
          COLLECTIONS.GLOBAL_SETTINGS,
          [Query.equal('key', 'debug_mode')]
        );
        console.log('Debug mode documents:', documents);

        if (documents.documents.length > 0) {
          const value = documents.documents[0].value === 'true';
          console.log('Setting debug mode to:', value);
          setDebugMode(value);
        } else {
          console.log('No debug mode setting found');
        }
      } catch (error) {
        console.error("Error fetching debug mode:", error);
        if ((error as any)?.code === 404) {
          console.log('Collection not found, defaulting to false');
        }
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