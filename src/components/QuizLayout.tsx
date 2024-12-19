import { QuizSection } from "@/types/quiz";
import SectionNav from "./SectionNav";
import QuizProgress from "./QuizProgress";

interface QuizLayoutProps {
  sections: QuizSection[];
  currentSectionIndex: number;
  currentQuestionIndex: number;
  answers: { [key: string]: number };
  onQuestionSelect: (sectionIndex: number, questionIndex: number) => void;
  canNavigateToSection: (sectionIndex: number) => boolean;
  onPrevious: () => void;
  onNext: () => void;
  canGoNext: boolean;
  children: React.ReactNode;
  questionErrors?: { [key: string]: boolean };
}

const QuizLayout = ({
  sections,
  currentSectionIndex,
  currentQuestionIndex,
  answers,
  onQuestionSelect,
  canNavigateToSection,
  onPrevious,
  onNext,
  canGoNext,
  children,
  questionErrors,
}: QuizLayoutProps) => {
  const currentSection = sections[currentSectionIndex];
  const currentSubcategory = currentSection.questions[currentQuestionIndex]?.subcategory || "";

  const handleSectionChange = (index: number) => {
    if (canNavigateToSection(index)) {
      onQuestionSelect(index, 0);
    }
  };

  const handleSubcategoryChange = (subcategory: string) => {
    const questionIndex = currentSection.questions.findIndex(
      (q) => q.subcategory === subcategory
    );
    if (questionIndex !== -1) {
      onQuestionSelect(currentSectionIndex, questionIndex);
    }
  };

  const handleQuestionChange = (sectionIndex: number, questionIndex: number) => {
    onQuestionSelect(sectionIndex, questionIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB]">
      <div className="max-w-4xl mx-auto pt-24 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionNav
            sections={sections}
            currentSectionIndex={currentSectionIndex}
            currentQuestionIndex={currentQuestionIndex}
            currentSubcategory={currentSubcategory}
            onSectionChange={handleSectionChange}
            onSubcategoryChange={handleSubcategoryChange}
            onQuestionChange={handleQuestionChange}
            isEnabled={true}
            answers={answers}
          />
          <QuizProgress
            sections={sections}
            currentSectionIndex={currentSectionIndex}
            currentQuestionIndex={currentQuestionIndex}
            onPrevious={onPrevious}
            onNext={onNext}
            canGoNext={canGoNext}
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export default QuizLayout;