import { useState } from "react";
import { quizSections } from "../data/quizData";
import { QuizResults as QuizResultsType } from "../types/quiz";
import QuizProgress from "../components/QuizProgress";
import QuizQuestion from "../components/QuizQuestion";
import QuizResultsComponent from "../components/QuizResults";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState<QuizResultsType | null>(null);

  const currentSection = quizSections[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];

  const handleAnswer = (value: number) => {
    if (!results) {
      setResults({
        [currentSection.id]: value,
        total: value,
      });
    } else {
      setResults((prev) => {
        if (!prev) return null;
        const sectionTotal = (prev[currentSection.id] || 0) + value;
        return {
          ...prev,
          [currentSection.id]: sectionTotal,
          total: Object.values(prev).reduce((acc, curr) => acc + curr, 0) + value,
        };
      });
    }

    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSectionIndex < quizSections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const handleRestart = () => {
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setResults(null);
  };

  if (!currentSection || !currentQuestion) {
    return results ? (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 p-6">
        <QuizResultsComponent results={results} onRestart={handleRestart} />
      </div>
    ) : null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-eco-dark">
            Sustainability Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <QuizProgress
            sections={quizSections}
            currentSectionIndex={currentSectionIndex}
          />
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-eco-primary">
              {currentSection.title}
            </h2>
            <p className="text-gray-600">{currentSection.description}</p>
          </div>
          <QuizQuestion question={currentQuestion} onAnswer={handleAnswer} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;