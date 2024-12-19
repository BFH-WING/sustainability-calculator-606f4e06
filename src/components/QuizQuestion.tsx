import { Question } from "../types/quiz";
import { Button } from "@/components/ui/button";

interface QuizQuestionProps {
  question: Question;
  onAnswer: (value: number) => void;
  selectedValue?: number;
}

const QuizQuestion = ({ question, onAnswer, selectedValue }: QuizQuestionProps) => {
  return (
    <div className="animate-fadeIn">
      <h3 className="text-xl font-semibold mb-6 text-eco-dark">
        {question.text}
      </h3>
      {question.description && (
        <p 
          className="text-gray-600 mb-4"
          dangerouslySetInnerHTML={{ __html: question.description }}
        />
      )}
      <div className="grid gap-4">
        {question.options.map((option) => (
          <Button
            key={option.id}
            variant={selectedValue === option.value ? "default" : "outline"}
            className={`p-6 text-left transition-all ${
              selectedValue === option.value
                ? "bg-eco-primary text-white hover:bg-eco-dark"
                : "hover:bg-eco-light hover:text-eco-dark"
            }`}
            onClick={() => onAnswer(option.value)}
          >
            {option.text}
          </Button>
        ))}
      </div>
      {question.source_url && (
        <div className="mt-4 text-sm text-gray-500">
          <a 
            href={question.source_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Source
          </a>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;