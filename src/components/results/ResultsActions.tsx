interface ResultsActionsProps {
  onRestart: () => void;
  onSaveResults: () => void;
  onGoToDashboard: () => void;
  showSaveButton: boolean;
  isLoggedIn: boolean;
}

const ResultsActions = ({ 
  onRestart, 
  onSaveResults, 
  onGoToDashboard, 
  showSaveButton,
  isLoggedIn 
}: ResultsActionsProps) => {
  return (
    <div className="flex justify-center gap-4 mt-8 mb-8">
      <button
        onClick={onRestart}
        className="bg-white text-eco-primary border-2 border-eco-primary px-8 py-3 rounded-lg text-lg font-semibold hover:bg-eco-primary hover:text-white transition-colors"
      >
        Retake Assessment
      </button>
      {showSaveButton && (
        <button
          onClick={onSaveResults}
          className="bg-eco-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-eco-dark transition-colors"
        >
          Save Results
        </button>
      )}
      <button
        onClick={onGoToDashboard}
        className="bg-eco-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-eco-dark transition-colors"
      >
        {isLoggedIn ? 'Go to Dashboard' : 'Sign in to Save Results'}
      </button>
    </div>
  );
};

export default ResultsActions;