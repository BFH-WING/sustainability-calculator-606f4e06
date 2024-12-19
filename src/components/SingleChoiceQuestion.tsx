import { Question } from "../types/quiz";
import { Button } from "@/components/ui/button";

interface SingleChoiceQuestionProps {
  question: Question;
  onAnswer: (value: number) => void;
  selectedValue?: number;
}

const SingleChoiceQuestion = ({ question, onAnswer, selectedValue }: SingleChoiceQuestionProps) => {
  // Convert option values to percentages (0-100)
  const getPercentageValue = (optionValue: number) => {
    const maxValue = Math.max(...question.options.map(opt => opt.value));
    return (optionValue / maxValue) * 100;
  };

  return (
    <div className="grid gap-4">
      {question.options.map((option) => (
        <Button
          key={option.id}
          variant={selectedValue === getPercentageValue(option.value) ? "default" : "outline"}
          className={`p-6 text-left transition-all ${
            selectedValue === getPercentageValue(option.value)
              ? "bg-eco-primary text-white hover:bg-eco-dark"
              : "hover:bg-eco-light hover:text-eco-dark"
          }`}
          onClick={() => onAnswer(getPercentageValue(option.value))}
        >
          {option.text}
        </Button>
      ))}
    </div>
  );
};

export default SingleChoiceQuestion;