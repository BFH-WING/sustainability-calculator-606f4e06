import { Question } from "../types/quiz";
import { Button } from "@/components/ui/button";

interface SingleChoiceQuestionProps {
  question: Question;
  onAnswer: (value: number) => void;
  selectedValue?: number;
}

const SingleChoiceQuestion = ({ question, onAnswer, selectedValue }: SingleChoiceQuestionProps) => {
  return (
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
  );
};

export default SingleChoiceQuestion;