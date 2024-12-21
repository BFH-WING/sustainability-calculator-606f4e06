import { useQuizData } from "@/hooks/useQuizData";
import QuizQuestion from "@/components/QuizQuestion";
import QuizResults from "@/components/QuizResults";
import QuizLayout from "@/components/QuizLayout";
import { calculateResults } from "@/utils/quizCalculations";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useQuizState } from "@/hooks/useQuizState";

const Quiz = () => {
  const { data: sections, isLoading } = useQuizData();
  const location = useLocation();
  const {
    currentSectionIndex,
    currentQuestionIndex,
    answers,
    completed,
    questionErrors,
    handleReset,
    handleNext,
    handlePrevious,
    handleQuestionSelect,
    setAnswers,
    setQuestionErrors,
    setCompleted,
    setCurrentSectionIndex,
    setCurrentQuestionIndex,
  } = useQuizState();

  // Reset state when navigating to quiz with reset flag
  useEffect(() => {
    if (location.state?.reset) {
      console.log("Resetting quiz state");
      handleReset();
    }
  }, [location.state, handleReset]);

  const handleAnswer = (value: number) => {
    if (!sections) return;
    
    const currentQuestion = sections[currentSectionIndex].questions[currentQuestionIndex];
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));

    setQuestionErrors(prev => ({
      ...prev,
      [currentQuestion.id]: false
    }));
  };

  const handleError = (hasError: boolean) => {
    if (!sections) return;
    
    const currentQuestion = sections[currentSectionIndex].questions[currentQuestionIndex];
    setQuestionErrors(prev => ({
      ...prev,
      [currentQuestion.id]: hasError
    }));
  };

  const canNavigateToSection = (sectionIndex: number) => {
    if (!sections) return false;
    if (sectionIndex === 0) return true;
    if (sectionIndex > currentSectionIndex + 1) return false;
    
    for (let i = 0; i < sectionIndex; i++) {
      const sectionQuestions = sections[i].questions;
      const allQuestionsAnswered = sectionQuestions.every(
        (question) => answers[question.id] !== undefined
      );
      if (!allQuestionsAnswered) return false;
    }
    return true;
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

  // Add Results section to sections array when completed
  const sectionsWithResults = completed 
    ? [...sections, { 
        id: 'results',
        title: 'Results',
        description: 'Your assessment results',
        questions: []
      }]
    : sections;

  if (completed) {
    return (
      <QuizLayout
        sections={sectionsWithResults}
        currentSectionIndex={sectionsWithResults.length - 1}
        currentQuestionIndex={0}
        answers={answers}
        onQuestionSelect={() => {}}
        canNavigateToSection={() => true}
        onPrevious={() => {
          setCompleted(false);
          setCurrentSectionIndex(sections.length - 1);
          setCurrentQuestionIndex(sections[sections.length - 1].questions.length - 1);
        }}
        onNext={() => {}}
        canGoNext={false}
      >
        <QuizResults 
          results={calculateResults(sections, answers)} 
          onRestart={handleReset}
        />
      </QuizLayout>
    );
  }

  const currentQuestion = sections[currentSectionIndex].questions[currentQuestionIndex];
  const canGoNext = answers[currentQuestion.id] !== undefined && !questionErrors[currentQuestion.id];

  return (
    <QuizLayout
      sections={sectionsWithResults}
      currentSectionIndex={currentSectionIndex}
      currentQuestionIndex={currentQuestionIndex}
      answers={answers}
      onQuestionSelect={handleQuestionSelect}
      canNavigateToSection={canNavigateToSection}
      onPrevious={() => handlePrevious(sections)}
      onNext={() => handleNext(sections)}
      canGoNext={canGoNext}
      questionErrors={questionErrors}
    >
      <QuizQuestion
        question={currentQuestion}
        onAnswer={handleAnswer}
        selectedValue={answers[currentQuestion.id]}
        onError={handleError}
      />
    </QuizLayout>
  );
};

export default Quiz;