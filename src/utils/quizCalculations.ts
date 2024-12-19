import { QuizSection, QuizResults } from "@/types/quiz";

export const calculateResults = (sections: QuizSection[], answers: { [key: string]: number }): QuizResults => {
  let totalScore = 0;
  let totalWeight = 0;

  sections.forEach(section => {
    section.questions.forEach(question => {
      const answer = answers[question.id];
      if (answer !== undefined) {
        totalScore += answer * question.weight;
        totalWeight += question.weight;
      }
    });
  });

  // Calculate the weighted average as the total score
  const total = totalWeight > 0 ? Math.round((totalScore / totalWeight)) : 0;

  return {
    ...answers,
    total
  };
};