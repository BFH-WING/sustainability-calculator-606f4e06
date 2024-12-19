import { Question } from "../types/quiz";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { calculateNewPercentages, calculateTotalPercentage } from "@/utils/percentageCalculations";

interface PercentageQuestionProps {
  question: Question;
  onAnswer: (value: number) => void;
  selectedValue?: number;
  onError?: (hasError: boolean) => void;
}

const PercentageQuestion = ({ question, onAnswer, selectedValue, onError }: PercentageQuestionProps) => {
  const [percentages, setPercentages] = useState<{ [key: string]: number }>(
    question.options.reduce((acc, option) => ({
      ...acc,
      [option.id]: selectedValue || 0
    }), {})
  );

  const [error, setError] = useState<string | null>(null);

  const totalPercentage = calculateTotalPercentage(percentages);

  useEffect(() => {
    const hasError = totalPercentage !== 100;
    setError(hasError ? `Total must equal 100% (currently ${totalPercentage}%)` : null);
    onError?.(hasError);
  }, [totalPercentage, onError]);

  const handleSliderChange = (value: number[], optionId: string) => {
    const newValue = value[0];
    const oldValue = percentages[optionId];
    
    const newPercentages = calculateNewPercentages(percentages, optionId, newValue, oldValue);
    console.log('Setting new percentages:', newPercentages, 'Total:', calculateTotalPercentage(newPercentages));
    
    setPercentages(newPercentages);
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
            step={1}
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
      <div className="text-sm text-gray-500 mt-2">
        Total: {totalPercentage}%
      </div>
    </div>
  );
};

export default PercentageQuestion;