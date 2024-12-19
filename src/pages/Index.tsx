import { useState } from "react";
import { quizSections } from "../data/quizData";
import { QuizResults as QuizResultsType } from "../types/quiz";
import QuizProgress from "../components/QuizProgress";
import QuizQuestion from "../components/QuizQuestion";
import QuizResultsComponent from "../components/QuizResults";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [isStarted, setIsStarted] = useState(false);
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
    setIsStarted(false);
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setResults(null);
  };

  const handleSectionClick = (index: number) => {
    if (!results) {
      setCurrentSectionIndex(index);
      setCurrentQuestionIndex(0);
    }
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-4xl font-bold text-eco-dark">
              Sustainability Calculator
            </CardTitle>
            <p className="text-lg text-gray-600">
              Discover your environmental impact through our comprehensive sustainability assessment.
              Answer questions across 5 key areas to receive personalized insights.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quizSections.map((section) => (
                <Card key={section.id} className="p-4 bg-white/50">
                  <h3 className="font-semibold text-eco-primary">{section.title}</h3>
                  <p className="text-sm text-gray-600">{section.description}</p>
                </Card>
              ))}
            </div>
            <Button 
              onClick={() => setIsStarted(true)}
              className="w-full bg-eco-primary hover:bg-eco-dark text-white py-6 text-lg"
            >
              Start Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentSection || !currentQuestion) {
    return results ? (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 p-6">
        <QuizResultsComponent results={results} onRestart={handleRestart} />
      </div>
    ) : null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <div className="flex">
        {/* Sections sidebar */}
        <div className="w-64 bg-white/80 min-h-screen p-4 border-r border-eco-light">
          <h2 className="text-xl font-bold text-eco-dark mb-4">Sections</h2>
          <div className="space-y-2">
            {quizSections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(index)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  index === currentSectionIndex
                    ? "bg-eco-primary text-white"
                    : "hover:bg-eco-light"
                } ${
                  index < currentSectionIndex
                    ? "text-eco-primary"
                    : "text-gray-600"
                }`}
                disabled={results !== null}
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full border flex items-center justify-center mr-2">
                    {index + 1}
                  </span>
                  {section.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-eco-dark">
                {currentSection.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <QuizProgress
                sections={quizSections}
                currentSectionIndex={currentSectionIndex}
              />
              <div className="mb-6">
                <p className="text-gray-600">{currentSection.description}</p>
              </div>
              <QuizQuestion question={currentQuestion} onAnswer={handleAnswer} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;