import { QuizSection } from "@/types/quiz";

interface SectionNavProps {
  sections: QuizSection[];
  currentSectionIndex: number;
  currentSubcategory: string;
  onSectionChange: (index: number) => void;
  onSubcategoryChange: (subcategory: string) => void;
  isEnabled: boolean;
}

const SectionNav = ({ 
  sections, 
  currentSectionIndex, 
  currentSubcategory,
  onSectionChange, 
  onSubcategoryChange,
  isEnabled 
}: SectionNavProps) => {
  const currentSection = sections[currentSectionIndex];
  
  // Get unique subcategories for the current section
  const subcategories = Array.from(
    new Set(currentSection.questions.map((q) => q.subcategory))
  ).filter(Boolean);

  return (
    <div className="w-full mb-8 space-y-4">
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
      {subcategories.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center border-t pt-4">
          {subcategories.map((subcategory) => (
            <button
              key={subcategory}
              onClick={() => onSubcategoryChange(subcategory)}
              className={`px-3 py-1.5 rounded text-xs transition-colors ${
                currentSubcategory === subcategory
                  ? "bg-eco-secondary text-white"
                  : "bg-white text-eco-dark hover:bg-eco-light border border-eco-light"
              }`}
            >
              {subcategory}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionNav;