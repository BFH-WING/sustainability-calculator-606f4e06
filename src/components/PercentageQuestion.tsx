import { Question } from "../types/quiz";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { calculateTotalPercentage } from "@/utils/percentageCalculations";

interface PercentageQuestionProps {
  question: Question;
  onAnswer: (value: number) => void;
  selectedValue?: number;
  onError?: (hasError: boolean) => void;
}

const PercentageQuestion = ({ question, onAnswer, selectedValue, onError }: PercentageQuestionProps) => {
  // Initialize percentages state with the current question's options
  const [percentages, setPercentages] = useState<{ [key: string]: number }>({});

  // Reset percentages when question changes
  useEffect(() => {
    console.log('Question changed, resetting percentages');
    const initialPercentages = question.options.reduce((acc, option) => ({
      ...acc,
      [option.id]: 0
    }), {});
    setPercentages(initialPercentages);
  }, [question.id]); // Reset when question.id changes

  const [error, setError] = useState<string | null>(null);

  const totalPercentage = calculateTotalPercentage(percentages);

  useEffect(() => {
    const hasError = totalPercentage !== 100;
    setError(hasError ? `Total must equal 100% (currently ${totalPercentage}%)` : null);
    onError?.(hasError);
  }, [totalPercentage, onError]);

  const handleSliderChange = (value: number[], optionId: string) => {
    const newValue = Math.round(value[0] / 5) * 5; // Round to nearest 5%
    console.log('Setting new value for', optionId, ':', newValue);
    
    setPercentages(prev => ({
      ...prev,
      [optionId]: newValue
    }));
    onAnswer(newValue);
  };

  return (
    <div className="space-y-6">
      {question.options.map((option) => (
        <div key={option.id} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{option.text}</span>
            <span className="text-sm text-gray-500">{percentages[option.id]}%</span>
          </div>
          <Slider
            defaultValue={[percentages[option.id]]}
            max={100}
            step={5}
            value={[percentages[option.id]]}
            onValueChange={(value) => handleSliderChange(value, option.id)}
            className="w-full"
          />
        </div>
      ))}
      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
    </div>
  );
};

export default PercentageQuestion;