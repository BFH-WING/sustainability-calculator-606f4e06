import { QuizSection } from "../types/quiz";

interface QuizProgressProps {
  sections: QuizSection[];
  currentSectionIndex: number;
}

const QuizProgress = ({ sections, currentSectionIndex }: QuizProgressProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`flex-1 mx-1 h-2 rounded-full transition-all duration-300 ${
              index <= currentSectionIndex
                ? "bg-eco-primary"
                : "bg-eco-light"
            }`}
          />
        ))}
      </div>
      <p className="text-center text-sm text-gray-600">
        Section {currentSectionIndex + 1} of {sections.length}:{" "}
        {sections[currentSectionIndex].title}
      </p>
    </div>
  );
};

export default QuizProgress;