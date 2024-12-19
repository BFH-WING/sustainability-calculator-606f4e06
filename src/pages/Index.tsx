import { useState } from "react";
import { quizSections } from "../data/quizData";
import { QuizResults as QuizResultsType } from "../types/quiz";
import QuizProgress from "../components/QuizProgress";
import QuizQuestion from "../components/QuizQuestion";
import QuizResultsComponent from "../components/QuizResults";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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

  const TopNav = () => (
    <div className="w-full bg-white/80 backdrop-blur-sm border-b border-eco-light fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-eco-primary" />
            <span className="text-xl font-bold text-eco-primary">EcoMetrics</span>
          </div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-eco-primary">About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-[400px]">
                    <h3 className="text-lg font-medium mb-2 text-eco-primary">About EcoMetrics</h3>
                    <p className="text-gray-600">
                      Discover your environmental impact and get personalized recommendations
                      to reduce your carbon footprint.
                    </p>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-eco-primary">Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-[400px]">
                    <h3 className="text-lg font-medium mb-2 text-eco-primary">Sustainability Resources</h3>
                    <p className="text-gray-600">
                      Access guides, tips, and educational materials about sustainable living.
                    </p>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB]">
        <TopNav />
        <div className="pt-24 px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="flex justify-center mb-6">
              <Leaf className="h-16 w-16 text-eco-primary animate-bounce" />
            </div>
            <h1 className="text-5xl font-bold text-eco-dark mb-6">
              Sustainability Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover your environmental impact through our comprehensive sustainability assessment.
              Answer questions across {quizSections.length} key areas to receive personalized insights.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {quizSections.map((section) => (
                <Card key={section.id} className="bg-white/50 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-eco-primary flex items-center gap-2">
                      <Leaf className="h-5 w-5" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{section.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button 
              onClick={() => setIsStarted(true)}
              className="w-full max-w-md mx-auto bg-eco-primary hover:bg-eco-dark text-white py-6 text-lg flex items-center justify-center gap-2"
            >
              <Leaf className="h-5 w-5" />
              Start Assessment
            </Button>
          </div>
        </div>
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
        {/* Sections sidebar */}
        <div className="w-64 bg-white/80 min-h-screen p-4 border-r border-eco-light fixed left-0 top-16 overflow-y-auto">
          <h2 className="text-xl font-bold text-eco-dark mb-4 flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            Sections
          </h2>
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
        <div className="flex-1 pl-64">
          <div className="p-6">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center text-eco-dark flex items-center justify-center gap-2">
                  <Leaf className="h-5 w-5" />
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
    </div>
  );
};

export default Index;
