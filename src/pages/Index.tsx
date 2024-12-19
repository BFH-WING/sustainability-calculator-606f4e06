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
  const currentQuestion = currentSection?.questions[currentQuestionIndex];

  const handleStart = () => {
    setStarted(true);
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
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentQuestionIndex(sections[currentSectionIndex - 1].questions.length - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      setCompleted(true);
    }
  };

  const handleSectionChange = (index: number) => {
    setCurrentSectionIndex(index);
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

  // Check if all questions in previous sections are answered
  const canNavigateToSection = (targetIndex: number) => {
    if (targetIndex === 0) return true;
    
    for (let i = 0; i < targetIndex; i++) {
      const sectionQuestions = sections[i].questions;
      const allQuestionsAnswered = sectionQuestions.every(
        (q) => answers[q.id] !== undefined
      );
      if (!allQuestionsAnswered) return false;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB]">
      <TopNav />
      <div className="max-w-4xl mx-auto pt-24 px-6">
        <SectionNav
          sections={sections}
          currentSectionIndex={currentSectionIndex}
          onSectionChange={handleSectionChange}
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