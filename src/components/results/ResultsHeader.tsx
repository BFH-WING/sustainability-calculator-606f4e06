import CircularityLevel from "../CircularityLevel";

interface ResultsHeaderProps {
  totalScore: number;
}

const ResultsHeader = ({ totalScore }: ResultsHeaderProps) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8 text-eco-dark">
        Your Circularity Assessment Results
      </h1>
      <CircularityLevel score={totalScore} />
    </>
  );
};

export default ResultsHeader;