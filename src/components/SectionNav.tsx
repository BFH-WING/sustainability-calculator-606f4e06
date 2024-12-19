import { QuizSection } from "@/types/quiz";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface SectionNavProps {
  sections: QuizSection[];
  currentSectionIndex: number;
  currentQuestionIndex: number;
  currentSubcategory: string;
  onSectionChange: (index: number) => void;
  onSubcategoryChange: (subcategory: string) => void;
  onQuestionChange: (sectionIndex: number, questionIndex: number) => void;
  isEnabled: boolean;
  answers: { [key: string]: number };
}

const SectionNav = ({
  sections,
  currentSectionIndex,
  currentQuestionIndex,
  currentSubcategory,
  onSectionChange,
  onSubcategoryChange,
  onQuestionChange,
  isEnabled,
  answers,
}: SectionNavProps) => {
  const currentSection = sections[currentSectionIndex];

  // Get unique subcategories for the current section
  const subcategories = Array.from(
    new Set(currentSection.questions.map((q) => q.subcategory))
  ).filter(Boolean);

  // Helper function to check if a question is answered
  const isQuestionAnswered = (questionId: string) => answers[questionId] !== undefined;

  return (
    <div className="w-full mb-8 space-y-4">
      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => isEnabled && onSectionChange(index)}
            disabled={!isEnabled}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              currentSectionIndex === index
                ? "bg-eco-primary text-white"
                : isEnabled
                ? "bg-eco-light text-eco-dark hover:bg-eco-secondary"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>

      {/* Subcategory Navigation */}
      {subcategories.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center border-t pt-4">
          {subcategories.map((subcategory) => (
            <button
              key={subcategory}
              onClick={() => onSubcategoryChange(subcategory)}
              className={`px-3 py-1.5 rounded text-xs transition-colors ${
                currentSubcategory === subcategory
                  ? "bg-eco-secondary text-white"
                  : "bg-white text-eco-dark hover:bg-eco-light border border-eco-light"
              }`}
            >
              {subcategory}
            </button>
          ))}
        </div>
      )}

      {/* Question Navigation Dropdown */}
      <div className="flex justify-center border-t pt-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-white border border-eco-light hover:bg-eco-light transition-colors">
            Question {currentQuestionIndex + 1}
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-64">
            {currentSection.questions.map((question, qIndex) => (
              <DropdownMenuItem
                key={question.id}
                onClick={() => onQuestionChange(currentSectionIndex, qIndex)}
                className={`flex items-center gap-2 ${
                  currentQuestionIndex === qIndex ? "bg-eco-light" : ""
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isQuestionAnswered(question.id)
                      ? "bg-eco-primary"
                      : "bg-gray-300"
                  }`}
                />
                <span className="flex-1">
                  Question {qIndex + 1}
                  {question.subcategory && (
                    <span className="text-xs text-gray-500 ml-2">
                      ({question.subcategory})
                    </span>
                  )}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SectionNav;