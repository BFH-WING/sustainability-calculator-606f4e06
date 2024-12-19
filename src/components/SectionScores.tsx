interface SectionScoresProps {
  results: { [key: string]: number };
  sectionWeights: {
    [key: string]: { weight: number; label: string };
  };
  gaugeColor: string;
}

const SectionScores = ({ results, sectionWeights, gaugeColor }: SectionScoresProps) => {
  return (
    <div className="space-y-4">
      {Object.entries(results).map(([key, value]) => {
        if (key === "total" || !sectionWeights[key]) return null;
        const { weight, label } = sectionWeights[key];
        return (
          <div key={key} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex-1">{label}</span>
              <span className="text-gray-500 mr-4">Weight: {weight}</span>
            </div>
            <div 
              className="h-1.5 bg-gray-100 rounded-full overflow-hidden"
              style={{
                background: `linear-gradient(to right, ${gaugeColor} ${(value / 5) * 100}%, #e5e7eb 0%)`
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SectionScores;