import { QuizSection } from "@/types/quiz";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

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
  // This would typically come from an admin settings context
  const isDebugMode = true;

  // Calculate total progress
  const totalQuestions = sections.reduce(
    (total, section) => total + section.questions.length,
    0
  );
  const answeredQuestions = Object.keys(answers).length;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  // Calculate section scores
  const calculateSectionScore = (section: QuizSection) => {
    const sectionQuestions = section.questions;
    let totalScore = 0;
    let maxPossibleScore = 0;
    let answeredCount = 0;

    sectionQuestions.forEach(question => {
      const answer = answers[question.id];
      
      // Skip "I don't know" answers (value of 0)
      if (answer !== undefined && answer !== 0) {
        if (question.type === 'single_choice') {
          totalScore += answer * question.weight;
          maxPossibleScore += 5 * question.weight; // 5 is max score for single choice
          answeredCount++;
        } else if (question.type === 'percentage') {
          const optionValues = question.options.reduce((sum, option) => {
            return sum + (option.value * (answer / 100));
          }, 0);
          totalScore += optionValues * question.weight;
          maxPossibleScore += 5 * question.weight; // 5 is max score for percentage
          answeredCount++;
        }
      }
      // Add to max possible score only if question is not answered or answer is not "I don't know"
      if (answer === undefined) {
        maxPossibleScore += 5 * question.weight;
      }
    });

    return {
      score: Math.round(totalScore * 10) / 10,
      maxScore: Math.round(maxPossibleScore * 10) / 10,
      answeredCount,
      totalQuestions: sectionQuestions.length,
      percentage: maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0
    };
  };

  // Create defaultValue array with the current section
  const defaultExpandedSections = [`section-${currentSectionIndex}`];

  return (
    <div className="fixed top-16 left-0 w-1/3 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Progress Overview
          </h2>
          <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-eco-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="text-sm text-gray-600 mt-2">
            {answeredQuestions} of {totalQuestions} questions answered (
            {Math.round(progressPercentage)}%)
          </div>
        </div>

        <Accordion
          type="multiple"
          defaultValue={defaultExpandedSections}
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
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">
                      {sectionIndex + 1}. {section.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-1">
                  {isDebugMode && (
                    <Alert className="mb-2 bg-gray-50">
                      <AlertDescription className="font-mono text-xs space-y-1">
                        <div>Questions answered: {sectionScore.answeredCount}/{sectionScore.totalQuestions}</div>
                        <div>Current score: {sectionScore.score}/{sectionScore.maxScore}</div>
                        <div>Section completion: {Math.round(sectionScore.percentage)}%</div>
                      </AlertDescription>
                    </Alert>
                  )}
                  <ul className="space-y-1 pl-4">
                    {section.questions.map((question, qIndex) => {
                      const isAnswered = answers[question.id] !== undefined;
                      const isCurrent =
                        isCurrentSection &&
                        currentQuestionIndex === qIndex;
                      const hasError = questionErrors?.[question.id];

                      return (
                        <li key={question.id}>
                          <button
                            onClick={() =>
                              canNavigate &&
                              onQuestionSelect(sectionIndex, qIndex)
                            }
                            className={cn(
                              "text-left w-full px-2 py-1 rounded text-sm",
                              isCurrent &&
                                "bg-eco-light text-eco-dark font-medium",
                              !isCurrent && canNavigate && "hover:bg-gray-50",
                              hasError && "text-red-500",
                              !canNavigate && "cursor-not-allowed"
                            )}
                            disabled={!canNavigate}
                          >
                            <span className="flex items-center">
                              <span className="mr-2">
                                {isAnswered ? "✓" : "○"}
                              </span>
                              {question.text}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
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