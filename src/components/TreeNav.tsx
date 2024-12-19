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
    <div className="fixed left-0 top-16 w-[40%] h-[calc(100vh-4rem)] bg-white/80 backdrop-blur-sm border-r border-eco-light overflow-y-auto">
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
        <div className="p-6 border-t border-eco-light bg-white/80">
          <div className="text-sm text-gray-600 space-y-4">
            <p className="font-medium">
              Disclaimer: The results of this diagnostic tool are not intended to provide a measure of environmental sustainability impact derived from the degree of circularity attained by the organization.
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <img
                src="/lovable-uploads/7455dfcd-9f33-41c8-b39e-3c6eef31dbac.png"
                alt="BFH Logo"
                className="h-12 object-contain"
              />
              <p>
                Developed by: Dr. Maria A. Franco
                <br />
                Implemented by: Moritz Maier
                <br />
                Bern University of Applied Sciences
                <br />
                <span className="text-gray-500">
                  Industrial Engineering and Management Science (WING)
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeNav;