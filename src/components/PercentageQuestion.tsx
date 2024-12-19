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
  const [percentages, setPercentages] = useState<{ [key: string]: number }>({});

  // Load initial percentages from localStorage or question
  useEffect(() => {
    console.log('Loading percentages for question:', question.id);
    const savedPercentages = localStorage.getItem(`percentages-${question.id}`);
    
    if (savedPercentages) {
      console.log('Found saved percentages:', savedPercentages);
      setPercentages(JSON.parse(savedPercentages));
    } else {
      console.log('No saved percentages found, initializing with zeros');
      const initialPercentages = question.options.reduce((acc, option) => ({
        ...acc,
        [option.id]: 0
      }), {});
      setPercentages(initialPercentages);
    }
  }, [question.id]);

  const [error, setError] = useState<string | null>(null);

  const totalPercentage = calculateTotalPercentage(percentages);

  // Save percentages to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(percentages).length > 0) {
      console.log('Saving percentages for question:', question.id, percentages);
      localStorage.setItem(`percentages-${question.id}`, JSON.stringify(percentages));
    }
  }, [percentages, question.id]);

  useEffect(() => {
    const hasError = totalPercentage !== 100;
    setError(hasError ? `Total must equal 100% (currently ${totalPercentage}%)` : null);
    onError?.(hasError);

    // Calculate normalized score (0-100%)
    if (!hasError) {
      const normalizedScore = Object.entries(percentages).reduce((score, [optionId, percentage]) => {
        const option = question.options.find(opt => opt.id === optionId);
        if (!option || option.text.includes("I don't know")) return score;
        
        // Convert percentage to decimal (e.g., 75% -> 0.75)
        const decimalPercentage = percentage / 100;
        
        // Calculate score based on option value (now representing percentage 0-100)
        return score + (option.value * decimalPercentage);
      }, 0);

      console.log('Calculated normalized score (0-100%):', normalizedScore);
      onAnswer(normalizedScore);
    }
  }, [totalPercentage, percentages, question.options, onError, onAnswer]);

  const handleSliderChange = (value: number[], optionId: string) => {
    const newValue = Math.round(value[0] / 5) * 5; // Round to nearest 5%
    console.log('Setting new value for', optionId, ':', newValue);
    
    setPercentages(prev => ({
      ...prev,
      [optionId]: newValue
    }));
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