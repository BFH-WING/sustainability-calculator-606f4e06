import { QuizSection } from "@/types/quiz";
import TreeNav from "./TreeNav";
import QuizProgress from "./QuizProgress";
import TopNav from "./TopNav";
import Footer from "./Footer";

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
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB] flex flex-col">
      <TopNav />
      <div className="flex-1 flex pt-16">
        <TreeNav
          sections={sections}
          currentSectionIndex={currentSectionIndex}
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          onQuestionSelect={onQuestionSelect}
          canNavigateToSection={canNavigateToSection}
          questionErrors={questionErrors}
        />
        <div className="ml-[40%] flex-1">
          <div className="max-w-4xl mx-auto pt-24 px-6">
            <div className="max-w-3xl mx-auto">
              <QuizProgress
                sections={sections}
                currentSectionIndex={currentSectionIndex}
                currentQuestionIndex={currentQuestionIndex}
                onPrevious={onPrevious}
                onNext={onNext}
                canGoNext={canGoNext}
              />
              {children}
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizLayout;