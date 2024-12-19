import { Question } from "../types/quiz";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";

interface QuizQuestionProps {
  question: Question;
  onAnswer: (value: number) => void;
  selectedValue?: number;
  onError?: (hasError: boolean) => void;
}

const QuizQuestion = ({ question, onAnswer, selectedValue, onError }: QuizQuestionProps) => {
  const [percentages, setPercentages] = useState<{ [key: string]: number }>(
    question.options.reduce((acc, option) => ({
      ...acc,
      [option.id]: selectedValue || 0
    }), {})
  );

  const [error, setError] = useState<string | null>(null);
  const [lastUpdatedOption, setLastUpdatedOption] = useState<string | null>(null);

  // Calculate total percentage
  const totalPercentage = Object.values(percentages).reduce((sum, value) => sum + value, 0);

  useEffect(() => {
    if (question.type === 'percentage') {
      const hasError = totalPercentage !== 100;
      setError(hasError ? `Total must equal 100% (currently ${totalPercentage}%)` : null);
      onError?.(hasError);
    }
  }, [totalPercentage, question.type, onError]);

  const handleSliderChange = (value: number[], optionId: string) => {
    const newValue = value[0];
    setLastUpdatedOption(optionId);
    
    if (question.type === 'percentage') {
      const newPercentages = { ...percentages };
      const oldValue = newPercentages[optionId];
      newPercentages[optionId] = newValue;

      // Calculate the change in value
      const valueDiff = newValue - oldValue;
      
      // Calculate remaining percentage that can be distributed
      const remainingPercentage = 100 - (totalPercentage + valueDiff);
      
      if (remainingPercentage < 0) {
        // If we need to reduce other values
        const otherOptionIds = Object.keys(percentages).filter(id => id !== optionId);
        const totalOtherValues = otherOptionIds.reduce((sum, id) => sum + newPercentages[id], 0);
        
        if (totalOtherValues > 0) {
          // Distribute the excess proportionally among other options
          otherOptionIds.forEach(id => {
            const proportion = newPercentages[id] / totalOtherValues;
            newPercentages[id] = Math.max(0, Math.round(newPercentages[id] + (remainingPercentage * proportion)));
          });
        }
      }

      console.log('Setting new percentages:', newPercentages, 'Total:', Object.values(newPercentages).reduce((sum, val) => sum + val, 0));
      setPercentages(newPercentages);
      onAnswer(newValue);
    } else {
      setPercentages(prev => ({
        ...prev,
        [optionId]: newValue
      }));
      onAnswer(newValue);
    }
  };

  const renderPercentageQuestion = () => (
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

  const renderSingleChoiceQuestion = () => (
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
      {question.type === 'percentage' ? renderPercentageQuestion() : renderSingleChoiceQuestion()}
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