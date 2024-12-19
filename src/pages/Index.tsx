import { useState } from "react";
import { useQuizData } from "@/hooks/useQuizData";
import QuizIntro from "@/components/QuizIntro";
import QuizQuestion from "@/components/QuizQuestion";
import QuizResults from "@/components/QuizResults";
import TopNav from "@/components/TopNav";
import QuizLayout from "@/components/QuizLayout";
import { QuizResults as QuizResultsType } from "@/types/quiz";

const Index = () => {
  const { data: sections, isLoading } = useQuizData();
  const [started, setStarted] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [completed, setCompleted] = useState(false);

  const calculateResults = (): QuizResultsType => {
    if (!sections) return { total: 0 };
    
    const results: { [key: string]: number } = {};
    let total = 0;
    let sectionCount = 0;
    
    sections.forEach(section => {
      let sectionTotal = 0;
      let answeredQuestions = 0;
      
      section.questions.forEach(question => {
        if (answers[question.id] !== undefined) {
          sectionTotal += answers[question.id];
          answeredQuestions++;
        }
      });
      
      if (answeredQuestions > 0) {
        results[section.id] = sectionTotal / answeredQuestions;
        total += results[section.id];
        sectionCount++;
      }
    });
    
    return {
      ...results,
      total: sectionCount > 0 ? total / sectionCount : 0
    };
  };

  const canNavigateToSection = (sectionIndex: number) => {
    if (sectionIndex === 0) return true;
    if (sectionIndex > currentSectionIndex + 1) return false;
    
    for (let i = 0; i < sectionIndex; i++) {
      const sectionQuestions = sections?.[i].questions || [];
      const allQuestionsAnswered = sectionQuestions.every(
        (question) => answers[question.id] !== undefined
      );
      if (!allQuestionsAnswered) return false;
    }
    return true;
  };

  const handleStart = () => {
    setStarted(true);
  };

  const handleRestart = () => {
    setStarted(true);
    setCompleted(false);
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  if (isLoading || !sections) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin-slow">
          <div className="w-16 h-16 border-4 border-eco-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

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

  const currentSection = sections[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];

  if (!currentQuestion) {
    console.error("Current question is undefined", {
      currentSectionIndex,
      currentQuestionIndex,
      sections
    });
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading question</div>
      </div>
    );
  }

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
      setCurrentQuestionIndex(prevSection.questions.length - 1);
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

  const handleQuestionSelect = (sectionIndex: number, questionIndex: number) => {
    if (canNavigateToSection(sectionIndex)) {
      setCurrentSectionIndex(sectionIndex);
      setCurrentQuestionIndex(questionIndex);
    }
  };

  return (
    <>
      <TopNav />
      <QuizLayout
        sections={sections}
        currentSectionIndex={currentSectionIndex}
        currentQuestionIndex={currentQuestionIndex}
        answers={answers}
        onQuestionSelect={handleQuestionSelect}
        canNavigateToSection={canNavigateToSection}
        onPrevious={handlePrevious}
        onNext={handleNext}
        canGoNext={answers[currentQuestion.id] !== undefined}
      >
        <h2 className="text-2xl font-semibold text-eco-dark mb-6">
          {currentSection.title}
        </h2>
        <QuizQuestion
          question={currentQuestion}
          onAnswer={handleAnswer}
          selectedValue={answers[currentQuestion.id]}
        />
      </QuizLayout>
    </>
  );
};

export default Index;