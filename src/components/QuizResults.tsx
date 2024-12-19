import RadarChart from "./RadarChart";
import { QuizResults as QuizResultsType } from "@/types/quiz";
import { circularityQuestions } from "@/data/circularityQuestions";

interface QuizResultsProps {
  results: QuizResultsType;
  onRestart: () => void;
}

const QuizResults = ({ results, onRestart }: QuizResultsProps) => {
  console.log('Rendering QuizResults with results:', results);
  
  // Calculate scores per section
  const sectionScores = circularityQuestions.reduce((acc, section) => {
    let totalScore = 0;
    let answeredQuestions = 0;

    section.questions.forEach(question => {
      const answer = results[question.id];
      if (answer !== undefined) {
        // Answer is already in percentage (0-100)
        totalScore += (answer * question.weight);
        answeredQuestions += question.weight;
      }
    });

    // Calculate weighted average percentage
    const percentage = answeredQuestions > 0 ? (totalScore / answeredQuestions) : 0;
    
    acc[section.id] = {
      score: Math.round(totalScore * 10) / 10,
      maxScore: answeredQuestions * 100,
      percentage: Math.round(percentage),
      label: section.title
    };
    return acc;
  }, {} as { [key: string]: { score: number; maxScore: number; percentage: number; label: string } });

  console.log('Section scores:', sectionScores);

  // Transform the results into the format needed for the radar chart
  const radarData = Object.entries(sectionScores).map(([id, data]) => ({
    subject: data.label,
    value: data.percentage,
  }));

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-eco-dark">
        Your Circularity Assessment Results
      </h1>
      
      <div className="mb-12">
        <div className="h-[400px]">
          <RadarChart 
            data={radarData} 
            color="#4CAF50"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-eco-dark">Detailed Scores by Section</h2>
        {Object.entries(sectionScores).map(([id, data]) => (
          <div key={id} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex-1 font-medium">{data.label}</span>
              <span className="text-gray-500">
                Score: {data.score}/{data.maxScore} ({data.percentage}%)
              </span>
            </div>
            <div 
              className="h-2 bg-gray-100 rounded-full overflow-hidden"
              style={{
                background: `linear-gradient(to right, #4CAF50 ${data.percentage}%, #e5e7eb 0%)`
              }}
            />
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={onRestart}
          className="bg-eco-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-eco-dark transition-colors"
        >
          Retake Assessment
        </button>
      </div>
    </div>
  );
};

export default QuizResults;