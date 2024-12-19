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
    let weightedScore = 0;
    let totalWeight = 0;

    section.questions.forEach(question => {
      const answer = results[question.id];
      if (answer !== undefined) {
        if (question.type === 'single_choice') {
          weightedScore += (answer * question.weight);
          totalWeight += question.weight;
        } else if (question.type === 'percentage') {
          // For percentage questions, calculate weighted average based on option values
          const optionValues = question.options.reduce((sum, option) => {
            return sum + (option.value * (answer / 100));
          }, 0);
          weightedScore += (optionValues * question.weight);
          totalWeight += question.weight;
        }
      }
    });

    // Calculate final percentage (normalize to 0-100 scale)
    const percentage = totalWeight > 0 ? (weightedScore / totalWeight) * 20 : 0; // Multiply by 20 since max score is 5
    
    acc[section.id] = {
      actual: Math.round(weightedScore * 10) / 10,
      max: totalWeight * 5, // Max score is 5 per question
      percentage: Math.round(percentage),
      label: section.title
    };
    return acc;
  }, {} as { [key: string]: { actual: number; max: number; percentage: number; label: string } });

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
                Score: {data.actual}/{data.max} ({data.percentage}%)
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