import { QuizSection } from "../../types/quiz";

export const endOfLifeSection: QuizSection = {
  id: "end-of-life",
  title: "Circular use and end-of-life",
  description: "Assessment of product lifecycle and end-of-life management",
  questions: [
    {
      id: "eol-1",
      text: "Do any of these circular business models target specific customer segments in your organization?",
      description: "What percentage of total sales are eligible under the mentioned business models?",
      subcategory: "Business models (current)",
      type: "percentage",
      weight: 0.6,
      options: [
        { id: "e1-1", text: "Sharing (0-100%)", value: 100 },
        { id: "e1-2", text: "Rental/Leasing (0-100%)", value: 80 },
        { id: "e1-3", text: "Repair (0-100%)", value: 60 },
        { id: "e1-4", text: "Second hand market/Remanufacturing (0-100%)", value: 40 },
        { id: "e1-5", text: "Traditional product sale (0-100%)", value: 20 },
        { id: "e1-6", text: "I don't know", value: 0 }
      ]
    },
    {
      id: "eol-2",
      text: "What is the commercial availability of spare parts?",
      description: "Full spare-parts stock available from the manufacturer or its dealers",
      subcategory: "Lifetime extension through repair",
      type: "single_choice",
      weight: 0.4,
      options: [
        { id: "e2-1", text: "Excellent", value: 5 },
        { id: "e2-2", text: "Good", value: 4 },
        { id: "e2-3", text: "Fair", value: 3 },
        { id: "e2-4", text: "Poor", value: 2 },
        { id: "e2-5", text: "Null", value: 1 },
        { id: "e2-6", text: "I don't know", value: 0 }
      ]
    },
    {
      id: "eol-3",
      text: "What is the average warranty period?",
      subcategory: "Lifetime extension through repair",
      type: "single_choice",
      weight: 0.4,
      options: [
        { id: "e3-1", text: ">75% of the useful life of the product", value: 5 },
        { id: "e3-2", text: "26-75% of the useful life of the product", value: 4 },
        { id: "e3-3", text: "Warranty during 25% or less of the average useful life of the product", value: 3 },
        { id: "e3-4", text: "Warranty for less than 1 year", value: 2 },
        { id: "e3-5", text: "No warranty", value: 1 },
        { id: "e3-6", text: "I don't know", value: 0 }
      ]
    }
  ]
};
