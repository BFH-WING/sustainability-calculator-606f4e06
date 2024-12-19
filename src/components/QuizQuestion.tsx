import { Question } from "../types/quiz";
import PercentageQuestion from "./PercentageQuestion";
import SingleChoiceQuestion from "./SingleChoiceQuestion";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface QuizQuestionProps {
  question: Question;
  onAnswer: (value: number) => void;
  selectedValue?: number;
  onError?: (hasError: boolean) => void;
}

const QuizQuestion = ({ question, onAnswer, selectedValue, onError }: QuizQuestionProps) => {
  // This would typically come from an admin settings context
  const isDebugMode = true; // TODO: Make this configurable via admin settings

  const calculateQuestionScore = (value: number | undefined): string => {
    if (value === undefined) return "No answer selected";
    
    if (question.type === 'single_choice') {
      return `Score: ${value} (Weight: ${question.weight})
              Weighted Score: ${value * question.weight}`;
    } else if (question.type === 'percentage') {
      const optionValues = question.options.reduce((sum, option) => {
        return sum + (option.value * (value / 100));
      }, 0);
      return `Percentage: ${value}%
              Score based on options: ${optionValues}
              Weight: ${question.weight}
              Weighted Score: ${optionValues * question.weight}`;
    }
    return "Unknown question type";
  };

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
      {question.type === 'percentage' ? (
        <PercentageQuestion
          question={question}
          onAnswer={onAnswer}
          selectedValue={selectedValue}
          onError={onError}
        />
      ) : (
        <SingleChoiceQuestion
          question={question}
          onAnswer={onAnswer}
          selectedValue={selectedValue}
        />
      )}
      {isDebugMode && (
        <Alert className="mt-4 bg-gray-50">
          <AlertDescription className="font-mono text-sm whitespace-pre-line">
            {calculateQuestionScore(selectedValue)}
          </AlertDescription>
        </Alert>
      )}
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