import { QuizSection } from "@/types/quiz";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight, ChevronDown, FolderOpen, Folder, FileText, CheckCircle2 } from "lucide-react";

interface TreeNavProps {
  sections: QuizSection[];
  currentSectionIndex: number;
  currentQuestionIndex: number;
  answers: { [key: string]: number };
  onQuestionSelect: (sectionIndex: number, questionIndex: number) => void;
  canNavigateToSection: (sectionIndex: number) => boolean;
}

const TreeNav = ({
  sections,
  currentSectionIndex,
  currentQuestionIndex,
  answers,
  onQuestionSelect,
  canNavigateToSection,
}: TreeNavProps) => {
  // Helper function to check if a question is answered
  const isQuestionAnswered = (questionId: string) => answers[questionId] !== undefined;

  // Group questions by subcategory
  const getGroupedQuestions = (questions: QuizSection["questions"]) => {
    const grouped: { [key: string]: typeof questions } = {};
    questions.forEach((question) => {
      const category = question.subcategory || "General";
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(question);
    });
    return grouped;
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] overflow-y-auto fixed left-0 top-16">
      <div className="p-2">
        <Accordion type="multiple" className="w-full">
          {sections.map((section, sectionIndex) => {
            const groupedQuestions = getGroupedQuestions(section.questions);
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
                  {Object.entries(groupedQuestions).map(([subcategory, questions]) => (
                    <div key={subcategory} className="pl-3 mb-2">
                      <div className="flex items-center gap-1 py-1 text-sm font-medium text-gray-500">
                        <ChevronRight className="h-3 w-3" />
                        {subcategory}
                      </div>
                      <ul className="space-y-1 pl-4">
                        {questions.map((question, qIndex) => {
                          const isAnswered = isQuestionAnswered(question.id);
                          const isCurrent =
                            isCurrentSection &&
                            currentQuestionIndex === section.questions.indexOf(question);

                          return (
                            <li key={question.id}>
                              <button
                                onClick={() =>
                                  canNavigate &&
                                  onQuestionSelect(
                                    sectionIndex,
                                    section.questions.indexOf(question)
                                  )
                                }
                                disabled={!canNavigate}
                                className={`w-full text-left py-1 text-sm flex items-center gap-2 rounded transition-colors ${
                                  isCurrent
                                    ? "text-eco-primary font-medium"
                                    : canNavigate
                                    ? "hover:text-eco-primary"
                                    : "text-gray-400 cursor-not-allowed"
                                }`}
                              >
                                {isAnswered ? (
                                  <CheckCircle2 className="h-4 w-4 text-eco-primary shrink-0" />
                                ) : (
                                  <FileText className="h-4 w-4 text-gray-400 shrink-0" />
                                )}
                                <span className="truncate">
                                  Question {section.questions.indexOf(question) + 1}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
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