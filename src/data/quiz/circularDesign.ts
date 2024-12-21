import { QuizSection } from "../../types/quiz";

export const circularDesignSection: QuizSection = {
  id: "circular-design",
  title: "Circular design",
  description: "Assessment of product design practices",
  questions: [
    {
      id: "design-1",
      text: "What percentage of your products are designed for:",
      description: "Consider the full lifecycle of your products",
      subcategory: "Design for circularity",
      type: "percentage",
      weight: 0.40, // Highest weight due to comprehensive nature
      options: [
        { id: "d1-1", text: "Reuse/Repair (0-100%)", value: 100 },
        { id: "d1-2", text: "Remanufacturing (0-100%)", value: 80 },
        { id: "d1-3", text: "Recycling (0-100%)", value: 60 },
        { id: "d1-4", text: "Biodegradation (0-100%)", value: 40 },
        { id: "d1-5", text: "Landfill/Incineration (0-100%)", value: 20 },
        { id: "d1-6", text: "I don't know", value: 0 }
      ]
    },
    {
      id: "design-2",
      text: "What percentage of your products are designed with standardized components?",
      subcategory: "Standardization",
      type: "percentage",
      weight: 0.30, // Important for circular economy
      options: [
        { id: "d2-1", text: "0-100%", value: 100 },
        { id: "d2-2", text: "I don't know", value: 0 }
      ]
    },
    {
      id: "design-3",
      text: "What percentage of your products are designed for easy disassembly?",
      subcategory: "Ease of disassembly",
      type: "percentage",
      weight: 0.30, // Equal weight with standardization
      options: [
        { id: "d3-1", text: "0-100%", value: 100 },
        { id: "d3-2", text: "I don't know", value: 0 }
      ]
    }
  ]
};