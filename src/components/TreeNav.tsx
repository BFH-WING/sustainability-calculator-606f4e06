import { QuizSection } from "@/types/quiz";
import QuestionList from "./TreeNav/QuestionList";

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
  questionErrors,
}: TreeNavProps) => {
  return (
    <div className="fixed left-0 top-16 w-[40%] h-screen bg-white/80 backdrop-blur-sm border-r border-eco-light overflow-y-auto">
      <div className="flex flex-col h-full">
        <div className="flex-1 p-6">
          <QuestionList
            sections={sections}
            currentSectionIndex={currentSectionIndex}
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            onQuestionSelect={onQuestionSelect}
            canNavigateToSection={canNavigateToSection}
            questionErrors={questionErrors}
          />
        </div>
      </div>
    </div>
  );
};

export default TreeNav;