import { QuizSection } from "@/types/quiz";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import ProgressBar from "./TreeNav/ProgressBar";
import SectionDebugInfo from "./TreeNav/SectionDebugInfo";
import QuestionList from "./TreeNav/QuestionList";

interface TreeNavProps {
  sections: QuizSection[];
  currentSectionIndex: number;
  currentQuestionIndex: number;
  answers: { [key: string]: number };
  onQuestionSelect: (sectionIndex: number, questionIndex: number) => void;
  canNavigateToSection: (sectionIndex: number) => boolean;
  questionErrors?: { [key: string]: boolean };
}

const TreeNav = ({
  sections,
  currentSectionIndex,
  currentQuestionIndex,
  answers,
  onQuestionSelect,
  canNavigateToSection,
  questionErrors,
}: TreeNavProps) => {
  const isDebugMode = true;
  const [openSections, setOpenSections] = useState<string[]>([`section-${currentSectionIndex}`]);

  useEffect(() => {
    if (!openSections.includes(`section-${currentSectionIndex}`)) {
      setOpenSections(prev => [...prev, `section-${currentSectionIndex}`]);
    }
  }, [currentSectionIndex]);

  // Calculate total progress
  const totalQuestions = sections.reduce(
    (total, section) => total + section.questions.length,
    0
  );
  const answeredQuestions = Object.keys(answers).length;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  // Calculate section scores using normalized percentages (0-100%)
  const calculateSectionScore = (section: QuizSection) => {
    const sectionQuestions = section.questions;
    let totalScore = 0;
    let answeredCount = 0;

    sectionQuestions.forEach(question => {
      const answer = answers[question.id];
      if (answer !== undefined) {
        totalScore += answer;
        answeredCount++;
      }
    });

    return {
      score: totalScore,
      maxScore: answeredCount * 100,
      answeredCount,
      totalQuestions: sectionQuestions.length,
      percentage: answeredCount > 0 ? totalScore / answeredCount : 0
    };
  };

  const handleAccordionChange = (value: string[]) => {
    if (!value.includes(`section-${currentSectionIndex}`)) {
      value.push(`section-${currentSectionIndex}`);
    }
    setOpenSections(value);
  };

  return (
    <div className="fixed top-16 left-0 w-1/3 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <ProgressBar
          progressPercentage={progressPercentage}
          answeredQuestions={answeredQuestions}
          totalQuestions={totalQuestions}
        />

        <Accordion
          type="multiple"
          value={openSections}
          onValueChange={handleAccordionChange}
          className="w-full"
        >
          {sections.map((section, sectionIndex) => {
            const isCurrentSection = currentSectionIndex === sectionIndex;
            const canNavigate = canNavigateToSection(sectionIndex);
            const sectionScore = calculateSectionScore(section);

            return (
              <AccordionItem 
                key={section.id}
                value={`section-${sectionIndex}`}
                className={cn(
                  "border-b",
                  !canNavigate && "opacity-50"
                )}
              >
                <AccordionTrigger
                  className={cn(
                    "hover:no-underline",
                    isCurrentSection && "text-eco-primary font-medium"
                  )}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm">
                      {sectionIndex + 1}. {section.title}
                    </span>
                    {isDebugMode && sectionScore.answeredCount > 0 && (
                      <span className="text-xs text-gray-500">
                        {sectionScore.percentage.toFixed(1)}%
                      </span>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-1">
                  {isDebugMode && (
                    <SectionDebugInfo sectionScore={sectionScore} />
                  )}
                  <QuestionList
                    questions={section.questions}
                    sectionIndex={sectionIndex}
                    currentSectionIndex={currentSectionIndex}
                    currentQuestionIndex={currentQuestionIndex}
                    answers={answers}
                    onQuestionSelect={onQuestionSelect}
                    canNavigate={canNavigate}
                    questionErrors={questionErrors}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default TreeNav;