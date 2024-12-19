import { CircleArrowUp, RefreshCw } from "lucide-react";
import { QuizSection } from "@/types/quiz";

interface QuizIntroProps {
  sections: QuizSection[];
  onStart: () => void;
}

const QuizIntro = ({ sections, onStart }: QuizIntroProps) => {
  return (
    <div className="pt-24 px-6">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <CircleArrowUp className="h-16 w-16 text-eco-primary" />
            <RefreshCw className="h-8 w-8 text-eco-accent absolute -right-2 -bottom-2 animate-spin-slow" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-eco-dark mb-4">
          BFH Circularity Diagnostics Tool
        </h1>
        <p className="text-sm text-gray-600 mb-2">
          Developed by: Dr. Maria A. Franco / Bern University of Applied Sciences
        </p>
        <p className="text-lg text-gray-700 mb-4">
          This tool will help your organization get a first glimpse on where they stand in their circularity journey.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-gray-600 italic">
            Disclaimer: The results of this diagnostic tool are not intended to provide a measure of environmental sustainability impact derived from the degree of circularity attained by th organization.
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-eco-dark mb-2">
                {section.title}
              </h3>
              <p className="text-gray-600">{section.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={onStart}
            className="bg-eco-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-eco-dark transition-colors"
          >
            Start Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizIntro;