import { useState } from "react";
import { useQuizData } from "../hooks/useQuizData";
import { QuizResults as QuizResultsType } from "../types/quiz";
import QuizProgress from "../components/QuizProgress";
import QuizQuestion from "../components/QuizQuestion";
import QuizResultsComponent from "../components/QuizResults";
import QuizIntro from "../components/QuizIntro";
import TopNav from "../components/TopNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleArrowUp } from "lucide-react";

const Index = () => {
  const { data: sections, isLoading, error } = useQuizData();
  const [isStarted, setIsStarted] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState<QuizResultsType | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB] flex items-center justify-center">
        <div className="text-center">
          <Leaf className="h-12 w-12 text-eco-primary animate-bounce mx-auto" />
          <p className="mt-4 text-eco-primary">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB] flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Error loading quiz data. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!sections || sections.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB] flex items-center justify-center">
        <div className="text-center text-eco-primary">
          <p>No quiz data available.</p>
        </div>
      </div>
    );
  }

  const currentSection = sections[currentSectionIndex];
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
    } else if (currentSectionIndex < sections.length - 1) {
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

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB]">
        <TopNav />
        <QuizIntro sections={sections} onStart={() => setIsStarted(true)} />
      </div>
    );
  }

  if (!currentSection || !currentQuestion) {
    return results ? (
      <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB]">
        <TopNav />
        <div className="pt-24">
          <QuizResultsComponent results={results} onRestart={handleRestart} />
        </div>
      </div>
    ) : null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB]">
      <TopNav />
      <div className="flex pt-16">
        <div className="w-80 bg-white/80 min-h-screen p-6 border-r border-eco-light fixed left-0 top-16 overflow-y-auto">
          <h2 className="text-xl font-bold text-eco-dark mb-6 flex items-center gap-2">
            <CircleArrowUp className="h-6 w-6" />
            Diagnostic Sections
          </h2>
          <div className="space-y-3">
            {sections.map((section, index) => (
              <button
                key={section.id}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
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
                  <span className="w-7 h-7 rounded-full border flex items-center justify-center mr-3 text-sm">
                    {index + 1}
                  </span>
                  {section.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 pl-80">
          <div className="p-6">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center text-eco-dark flex items-center justify-center gap-2">
                  <CircleArrowUp className="h-5 w-5" />
                  {currentSection.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <QuizProgress
                  sections={sections}
                  currentSectionIndex={currentSectionIndex}
                />
                <QuizQuestion 
                  question={currentQuestion}
                  onAnswer={handleAnswer} 
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
