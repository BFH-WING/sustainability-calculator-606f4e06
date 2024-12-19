import CircularityGauge from "./CircularityGauge";
import SectionScores from "./SectionScores";
import RadarChart from "./RadarChart";
import { QuizResults as QuizResultsType } from "@/types/quiz";
import { circularityQuestions } from "@/data/circularityQuestions";

interface QuizResultsProps {
  results: QuizResultsType;
  onRestart: () => void;
}

const QuizResults = ({ results, onRestart }: QuizResultsProps) => {
  console.log('Rendering QuizResults with results:', results);
  
  // Transform the results into the format needed for the radar chart
  const radarData = circularityQuestions.map((section) => ({
    subject: section.title,
    value: results[section.id] || 0,
  }));

  // Get section weights from circularityQuestions
  const sectionWeights = circularityQuestions.reduce((acc, section) => {
    acc[section.id] = {
      weight: 1, // Default weight if not specified
      label: section.title
    };
    return acc;
  }, {} as { [key: string]: { weight: number; label: string } });

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-eco-dark">
        Your Circularity Assessment Results
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <CircularityGauge 
            score={results.total} 
            colors={['#FF4D4D', '#FFA64D', '#FFE14D', '#4DFF4D', '#4DFFB3']}
          />
        </div>
        <div>
          <RadarChart 
            data={radarData} 
            color="#4DFF4D"
          />
        </div>
      </div>
      <SectionScores 
        results={results}
        sectionWeights={sectionWeights}
        gaugeColor="#4DFF4D"
      />
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