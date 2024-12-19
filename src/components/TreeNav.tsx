import { QuizSection } from "@/types/quiz";
import QuestionList from "./TreeNav/QuestionList";
import { Bug } from "lucide-react";
import { useState } from "react";

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
  const [showDebug, setShowDebug] = useState(false);

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
            <button
              onClick={() => setShowDebug(!showDebug)}
              className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors mb-4"
            >
              <Bug className="w-4 h-4" />
              <span>Debug View</span>
            </button>
            
            {showDebug && (
              <div className="bg-gray-100 p-4 rounded-md font-mono text-xs">
                Current Section: {currentSectionIndex} | Current Question: {currentQuestionIndex}
                <br />
                Answers: {JSON.stringify(answers)}
                {questionErrors && Object.keys(questionErrors).length > 0 && (
                  <>
                    <br />
                    Errors: {JSON.stringify(questionErrors)}
                  </>
                )}
              </div>
            )}

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