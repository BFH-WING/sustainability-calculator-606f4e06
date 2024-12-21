import RadarChart from "../RadarChart";

interface ResultsChartProps {
  radarData: Array<{ subject: string; value: number }>;
}

const ResultsChart = ({ radarData }: ResultsChartProps) => {
  return (
    <div className="mb-12">
      <div className="h-[400px]">
        <RadarChart data={radarData} color="#4CAF50" />
      </div>
    </div>
  );
};

export default ResultsChart;