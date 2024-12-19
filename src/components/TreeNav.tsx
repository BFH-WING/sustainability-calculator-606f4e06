import { QuizSection } from "@/types/quiz";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, Circle } from "lucide-react";

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
      <Accordion type="multiple" className="w-full">
        {sections.map((section, sectionIndex) => {
          const groupedQuestions = getGroupedQuestions(section.questions);
          const isCurrentSection = currentSectionIndex === sectionIndex;
          const canNavigate = canNavigateToSection(sectionIndex);

          return (
            <AccordionItem value={`section-${sectionIndex}`} key={section.id}>
              <AccordionTrigger
                className={`px-4 ${
                  !canNavigate
                    ? "text-gray-400 cursor-not-allowed"
                    : isCurrentSection
                    ? "text-eco-primary font-medium"
                    : ""
                }`}
              >
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                {Object.entries(groupedQuestions).map(([subcategory, questions]) => (
                  <div key={subcategory} className="pl-4">
                    <h4 className="text-sm font-medium text-gray-500 py-2">
                      {subcategory}
                    </h4>
                    <ul className="space-y-1">
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
                              className={`w-full text-left px-4 py-1.5 text-sm flex items-center gap-2 rounded-lg transition-colors ${
                                isCurrent
                                  ? "bg-eco-light text-eco-dark"
                                  : canNavigate
                                  ? "hover:bg-gray-50"
                                  : "text-gray-400 cursor-not-allowed"
                              }`}
                            >
                              {isAnswered ? (
                                <CheckCircle2 className="w-4 h-4 text-eco-primary" />
                              ) : (
                                <Circle className="w-4 h-4 text-gray-300" />
                              )}
                              Question {section.questions.indexOf(question) + 1}
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
  );
};

export default TreeNav;