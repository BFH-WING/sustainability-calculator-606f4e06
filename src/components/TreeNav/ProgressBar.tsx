interface ProgressBarProps {
  progressPercentage: number;
  answeredQuestions: number;
  totalQuestions: number;
}

const ProgressBar = ({ progressPercentage, answeredQuestions, totalQuestions }: ProgressBarProps) => (
  <div className="mb-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-2">
      Progress Overview
    </h2>
    <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
      <div
        className="bg-eco-primary h-full rounded-full transition-all duration-500"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
    <div className="text-sm text-gray-600 mt-2">
      {answeredQuestions} of {totalQuestions} questions answered (
      {Math.round(progressPercentage)}%)
    </div>
  </div>
);

export default ProgressBar;