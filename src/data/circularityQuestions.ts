import { QuizSection } from "../types/quiz";
import { circularDesignSection } from "./quiz/circularDesign";
import { materialSourcingSection } from "./quiz/materialSourcing";
import { productionSection } from "./quiz/production";
import { endOfLifeSection } from "./quiz/endOfLife";

export const circularityQuestions: QuizSection[] = [
  circularDesignSection,
  materialSourcingSection,
  productionSection,
  endOfLifeSection
];