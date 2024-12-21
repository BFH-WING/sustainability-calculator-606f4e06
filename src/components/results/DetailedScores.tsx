interface SectionScore {
  score: number;
  maxScore: number;
  percentage: number;
  label: string;
}

interface DetailedScoresProps {
  sectionScores: { [key: string]: SectionScore };
}

const DetailedScores = ({ sectionScores }: DetailedScoresProps) => {
  return (
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
  );
};

export default DetailedScores;