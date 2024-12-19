import RadarChart from "./RadarChart";
import SectionScores from "./SectionScores";
import { QuizResults as QuizResultsType } from "@/types/quiz";
import { circularityQuestions } from "@/data/circularityQuestions";

interface QuizResultsProps {
  results: QuizResultsType;
  onRestart: () => void;
}

const QuizResults = ({ results, onRestart }: QuizResultsProps) => {
  console.log('Rendering QuizResults with results:', results);
  
  // Calculate max possible scores per section
  const sectionMaxScores = circularityQuestions.reduce((acc, section) => {
    const maxScore = section.questions.reduce((sum, question) => {
      const maxOptionValue = Math.max(...question.options.map(opt => opt.value));
      return sum + maxOptionValue;
    }, 0);
    acc[section.id] = maxScore;
    return acc;
  }, {} as { [key: string]: number });

  // Calculate actual scores and percentages for each section
  const sectionScores = circularityQuestions.reduce((acc, section) => {
    const actualScore = section.questions.reduce((sum, question) => {
      return sum + (results[question.id] || 0);
    }, 0);
    const maxScore = sectionMaxScores[section.id];
    const percentage = (actualScore / maxScore) * 100;
    
    acc[section.id] = {
      actual: actualScore,
      max: maxScore,
      percentage: Math.round(percentage),
      label: section.title
    };
    return acc;
  }, {} as { [key: string]: { actual: number; max: number; percentage: number; label: string } });

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
        <div className="h-[400px]"> {/* Increased height for more prominence */}
          <RadarChart 
            data={radarData} 
            color="#4DFF4D"
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
                background: `linear-gradient(to right, #4DFF4D ${data.percentage}%, #e5e7eb 0%)`
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