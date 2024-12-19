import { useState } from "react";
import { useQuizData } from "@/hooks/useQuizData";
import QuizIntro from "@/components/QuizIntro";
import QuizQuestion from "@/components/QuizQuestion";
import QuizProgress from "@/components/QuizProgress";
import QuizResults from "@/components/QuizResults";
import TopNav from "@/components/TopNav";
import SectionNav from "@/components/SectionNav";
import { QuizResults as QuizResultsType } from "@/types/quiz";

const Index = () => {
  const { data: sections, isLoading } = useQuizData();
  const [started, setStarted] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSubcategory, setCurrentSubcategory] = useState<string>("");
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [completed, setCompleted] = useState(false);

  if (isLoading || !sections) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin-slow">
          <div className="w-16 h-16 border-4 border-eco-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  const currentSection = sections[currentSectionIndex];
  
  const filteredQuestions = currentSection.questions.filter(
    (q) => !currentSubcategory || q.subcategory === currentSubcategory
  );
  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleStart = () => {
    setStarted(true);
    if (currentSection.questions[0]?.subcategory) {
      setCurrentSubcategory(currentSection.questions[0].subcategory);
    }
  };

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSectionIndex > 0) {
      const prevSection = sections[currentSectionIndex - 1];
      setCurrentSectionIndex(currentSectionIndex - 1);
      if (prevSection.questions[0]?.subcategory) {
        setCurrentSubcategory(prevSection.questions[0].subcategory);
      }
      setCurrentQuestionIndex(prevSection.questions.length - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSectionIndex < sections.length - 1) {
      const nextSection = sections[currentSectionIndex + 1];
      setCurrentSectionIndex(currentSectionIndex + 1);
      if (nextSection.questions[0]?.subcategory) {
        setCurrentSubcategory(nextSection.questions[0].subcategory);
      }
      setCurrentQuestionIndex(0);
    } else {
      setCompleted(true);
    }
  };

  const handleSectionChange = (index: number) => {
    setCurrentSectionIndex(index);
    setCurrentQuestionIndex(0);
    const newSection = sections[index];
    if (newSection.questions[0]?.subcategory) {
      setCurrentSubcategory(newSection.questions[0].subcategory);
    }
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setCurrentSubcategory(subcategory);
    setCurrentQuestionIndex(0);
  };

  const calculateResults = (): QuizResultsType => {
    const results: QuizResultsType = {
      total: 0,
    };

    sections.forEach((section) => {
      let sectionTotal = 0;
      section.questions.forEach((question) => {
        const answer = answers[question.id] || 0;
        sectionTotal += answer;
      });
      results[section.id] = sectionTotal;
      results.total += sectionTotal;
    });

    return results;
  };

  const handleRestart = () => {
    setStarted(false);
    setCompleted(false);
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB]">
        <TopNav />
        <QuizIntro sections={sections} onStart={handleStart} />
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB] pt-24 px-6">
        <TopNav />
        <QuizResults results={calculateResults()} onRestart={handleRestart} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB]">
      <TopNav />
      <div className="max-w-4xl mx-auto pt-24 px-6">
        <SectionNav
          sections={sections}
          currentSectionIndex={currentSectionIndex}
          currentSubcategory={currentSubcategory}
          onSectionChange={handleSectionChange}
          onSubcategoryChange={handleSubcategoryChange}
          isEnabled={canNavigateToSection(currentSectionIndex)}
        />
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-eco-dark mb-6">
            {currentSection.title}
          </h2>
          <QuizProgress
            sections={sections}
            currentSectionIndex={currentSectionIndex}
            currentQuestionIndex={currentQuestionIndex}
            onPrevious={handlePrevious}
            onNext={handleNext}
            canGoNext={answers[currentQuestion.id] !== undefined}
          />
          <QuizQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            selectedValue={answers[currentQuestion.id]}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
