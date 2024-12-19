import { Question, QuizOption } from "../types/quiz";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface QuizQuestionProps {
  question: Question;
  onAnswer: (value: number) => void;
}

const QuizQuestion = ({ question, onAnswer }: QuizQuestionProps) => {
  return (
    <div className="animate-fadeIn">
      <h3 className="text-xl font-semibold mb-6 text-eco-dark">
        {question.text}
      </h3>
      <div className="grid gap-4">
        {question.options.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            className="p-6 text-left hover:bg-eco-light hover:text-eco-dark transition-all"
            onClick={() => onAnswer(option.value)}
          >
            {option.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;