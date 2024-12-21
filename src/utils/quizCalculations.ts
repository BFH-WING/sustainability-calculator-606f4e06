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

  // Calculate the weighted average and round to 2 decimal places
  const total = totalWeight > 0 ? Number((totalScore / totalWeight).toFixed(2)) : 0;

  return {
    ...answers,
    total
  };
};