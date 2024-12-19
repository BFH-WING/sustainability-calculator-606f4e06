import { QuizSection } from "@/types/quiz";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Folder, FolderOpen, FileText, CheckCircle2, AlertCircle } from "lucide-react";

interface TreeNavProps {
  sections: QuizSection[];
  currentSectionIndex: number;
  currentQuestionIndex: number;
  answers: { [key: string]: number };
  onQuestionSelect: (sectionIndex: number, questionIndex: number) => void;
  canNavigateToSection: (sectionIndex: number) => boolean;
  questionErrors?: { [key: string]: boolean };
}

const TreeNav = ({
  sections,
  currentSectionIndex,
  currentQuestionIndex,
  answers,
  onQuestionSelect,
  canNavigateToSection,
  questionErrors = {},
}: TreeNavProps) => {
  // Calculate total progress
  const totalQuestions = sections.reduce(
    (acc, section) => acc + section.questions.length,
    0
  );
  const answeredQuestions = Object.keys(answers).length;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  // Helper function to check if a question is answered
  const isQuestionAnswered = (questionId: string) => answers[questionId] !== undefined;

  // Create defaultValue array with the current section
  const defaultExpandedSections = [`section-${currentSectionIndex}`];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] fixed left-0 top-16 flex flex-col">
      {/* Overall Progress */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Overall Progress</span>
          <span className="text-sm font-medium text-eco-primary">
            {answeredQuestions}/{totalQuestions}
          </span>
        </div>
        <div className="h-2 bg-eco-light rounded-full overflow-hidden">
          <div
            className="h-full bg-eco-primary transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Tree Navigation */}
      <div className="flex-1 overflow-y-auto p-2">
        <Accordion 
          type="multiple" 
          className="w-full"
          defaultValue={defaultExpandedSections}
          value={defaultExpandedSections}
        >
          {sections.map((section, sectionIndex) => {
            const isCurrentSection = currentSectionIndex === sectionIndex;
            const canNavigate = canNavigateToSection(sectionIndex);

            return (
              <AccordionItem 
                value={`section-${sectionIndex}`} 
                key={section.id}
                className="border-none"
              >
                <AccordionTrigger
                  className={`py-1 hover:no-underline ${
                    !canNavigate
                      ? "text-gray-400 cursor-not-allowed"
                      : isCurrentSection
                      ? "text-eco-primary font-medium"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isCurrentSection ? (
                      <FolderOpen className="h-4 w-4" />
                    ) : (
                      <Folder className="h-4 w-4" />
                    )}
                    <span className="text-sm">{section.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-1">
                  <ul className="space-y-1 pl-4">
                    {section.questions.map((question, qIndex) => {
                      const isAnswered = isQuestionAnswered(question.id);
                      const isCurrent =
                        isCurrentSection &&
                        currentQuestionIndex === qIndex;
                      const hasError = questionErrors[question.id];

                      return (
                        <li key={question.id}>
                          <button
                            onClick={() =>
                              canNavigate &&
                              onQuestionSelect(sectionIndex, qIndex)
                            }
                            disabled={!canNavigate}
                            className={`w-full text-left py-1 text-sm flex items-center gap-2 rounded transition-colors ${
                              hasError 
                                ? "text-red-500"
                                : isCurrent
                                ? "text-eco-primary font-medium"
                                : canNavigate
                                ? "hover:text-eco-primary"
                                : "text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            {hasError ? (
                              <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                            ) : isAnswered ? (
                              <CheckCircle2 className="h-4 w-4 text-eco-primary shrink-0" />
                            ) : (
                              <FileText className="h-4 w-4 text-gray-400 shrink-0" />
                            )}
                            <div className="flex flex-col">
                              <span className="truncate">
                                {question.text}
                              </span>
                              {hasError && (
                                <span className="text-xs text-red-500">
                                  Total must equal 100%
                                </span>
                              )}
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default TreeNav;