import { Question } from "../types/quiz";
import PercentageQuestion from "./PercentageQuestion";
import SingleChoiceQuestion from "./SingleChoiceQuestion";

interface QuizQuestionProps {
  question: Question;
  onAnswer: (value: number) => void;
  selectedValue?: number;
  onError?: (hasError: boolean) => void;
}

const QuizQuestion = ({ question, onAnswer, selectedValue, onError }: QuizQuestionProps) => {
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