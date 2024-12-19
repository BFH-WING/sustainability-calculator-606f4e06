import { QuizSection } from "../types/quiz";

interface QuizProgressProps {
  sections: QuizSection[];
  currentSectionIndex: number;
  currentQuestionIndex: number;
}

const QuizProgress = ({ 
  sections, 
  currentSectionIndex,
  currentQuestionIndex 
}: QuizProgressProps) => {
  const currentSection = sections[currentSectionIndex];
  const totalQuestions = currentSection.questions.length;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </span>
        <span className="text-sm text-eco-primary font-medium">
          Section {currentSectionIndex + 1} of {sections.length}
        </span>
      </div>
      <div className="h-2 bg-eco-light rounded-full overflow-hidden">
        <div
          className="h-full bg-eco-primary transition-all duration-300"
          style={{
            width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default QuizProgress;