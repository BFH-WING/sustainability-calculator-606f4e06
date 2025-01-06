import { QuizSection } from "@/types/quiz";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface QuestionListProps {
  sections: QuizSection[];
  currentSectionIndex: number;
  currentQuestionIndex: number;
  onQuestionSelect: (sectionIndex: number, questionIndex: number) => void;
  answers: { [key: string]: number };
}

const QuestionList = ({
  sections,
  currentSectionIndex,
  currentQuestionIndex,
  onQuestionSelect,
  answers,
}: QuestionListProps) => {
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    const fetchDebugMode = async () => {
      try {
        console.log('Fetching debug mode setting...');
        const { data, error } = await supabase
          .from('global_settings')
          .select('value')
          .eq('key', 'debug_mode')
          .single();

        if (error) {
          console.error('Error fetching debug mode:', error);
          return;
        }

        console.log('Debug mode setting:', data);
        const value = data?.value === true;
        console.log('Setting debug mode to:', value);
        setDebugMode(value);
      } catch (error) {
        console.error("Error fetching debug mode:", error);
      }
    };

    fetchDebugMode();
  }, []);

  // Helper function to check if a question is answered
  const isQuestionAnswered = (questionId: string) => answers[questionId] !== undefined;

  return (
    <div className="space-y-4">
      {sections.map((section, sIndex) => (
        <div key={section.id} className="space-y-2">
          <h3 className="font-medium text-sm text-gray-700">
            {section.title}
          </h3>
          <div className="space-y-1">
            {section.questions.map((question, qIndex) => (
              <button
                key={question.id}
                onClick={() => onQuestionSelect(sIndex, qIndex)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center space-x-2
                  ${currentSectionIndex === sIndex && currentQuestionIndex === qIndex
                    ? "bg-eco-primary text-white"
                    : "hover:bg-eco-light"
                  }`}
              >
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    isQuestionAnswered(question.id)
                      ? "bg-eco-secondary"
                      : "bg-gray-300"
                  }`}
                />
                <span className="flex-1">
                  {debugMode ? `[${question.id}] ` : ""}Question {qIndex + 1}
                  {question.subcategory && (
                    <span className="text-xs opacity-75 ml-1">
                      ({question.subcategory})
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;