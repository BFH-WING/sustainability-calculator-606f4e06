import { QuizSection } from "@/types/quiz";

interface SectionNavProps {
  sections: QuizSection[];
  currentSectionIndex: number;
  onSectionChange: (index: number) => void;
  isEnabled: boolean;
}

const SectionNav = ({ sections, currentSectionIndex, onSectionChange, isEnabled }: SectionNavProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex flex-wrap gap-2 justify-center">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => isEnabled && onSectionChange(index)}
            disabled={!isEnabled}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              currentSectionIndex === index
                ? "bg-eco-primary text-white"
                : isEnabled
                ? "bg-eco-light text-eco-dark hover:bg-eco-secondary"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SectionNav;