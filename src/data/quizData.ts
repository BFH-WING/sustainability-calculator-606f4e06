import { QuizSection } from "../types/quiz";

export const quizSections: QuizSection[] = [
  {
    id: "materials",
    title: "Materials & Resources",
    description: "Let's evaluate your material usage and sourcing practices",
    questions: [
      {
        id: "materials-1",
        text: "What percentage of your materials are recycled?",
        type: "single_choice",
        weight: 0.6,
        options: [
          { id: "m1-1", text: "0-20%", value: 1 },
          { id: "m1-2", text: "21-40%", value: 2 },
          { id: "m1-3", text: "41-60%", value: 3 },
          { id: "m1-4", text: "61-80%", value: 4 },
          { id: "m1-5", text: "81-100%", value: 5 },
          { id: "m1-6", text: "I don't know", value: 0 }
        ],
      },
      {
        id: "materials-2",
        text: "Do you use sustainable packaging?",
        type: "single_choice",
        weight: 0.4,
        options: [
          { id: "m2-1", text: "Yes, all packaging is sustainable", value: 5 },
          { id: "m2-2", text: "Most packaging is sustainable", value: 4 },
          { id: "m2-3", text: "Some packaging is sustainable", value: 2 },
          { id: "m2-4", text: "No sustainable packaging", value: 1 },
        ],
      }
    ],
  },
  {
    id: "transportation",
    title: "Transportation",
    description: "Let's evaluate your transportation habits",
    questions: [
      {
        id: "transport-1",
        text: "What's your primary mode of transportation?",
        type: "single_choice",
        weight: 0.7,
        options: [
          { id: "t1-1", text: "Walk or bicycle", value: 5 },
          { id: "t1-2", text: "Public transportation", value: 4 },
          { id: "t1-3", text: "Electric/Hybrid car", value: 3 },
          { id: "t1-4", text: "Conventional car", value: 1 },
        ],
      },
      {
        id: "transport-2",
        text: "How many miles do you travel per week?",
        type: "single_choice",
        weight: 0.3,
        options: [
          { id: "t2-1", text: "Less than 50", value: 5 },
          { id: "t2-2", text: "50-100", value: 4 },
          { id: "t2-3", text: "100-200", value: 2 },
          { id: "t2-4", text: "More than 200", value: 1 },
        ],
      },
    ],
  },
  {
    id: "energy",
    title: "Home Energy",
    description: "Let's look at your home energy consumption",
    questions: [
      {
        id: "energy-1",
        text: "What type of energy powers your home?",
        type: "single_choice",
        weight: 0.6,
        options: [
          { id: "e1-1", text: "Renewable energy", value: 5 },
          { id: "e1-2", text: "Mixed sources", value: 3 },
          { id: "e1-3", text: "Conventional grid", value: 1 },
        ],
      },
      {
        id: "energy-2",
        text: "How do you heat/cool your home?",
        type: "single_choice",
        weight: 0.4,
        options: [
          { id: "e2-1", text: "Natural ventilation", value: 5 },
          { id: "e2-2", text: "Energy efficient system", value: 4 },
          { id: "e2-3", text: "Conventional system", value: 1 },
        ],
      },
    ],
  },
  {
    id: "food",
    title: "Food Choices",
    description: "Let's examine your dietary habits",
    questions: [
      {
        id: "food-1",
        text: "What best describes your diet?",
        type: "single_choice",
        weight: 0.5,
        options: [
          { id: "f1-1", text: "Plant-based", value: 5 },
          { id: "f1-2", text: "Vegetarian", value: 4 },
          { id: "f1-3", text: "Flexitarian", value: 3 },
          { id: "f1-4", text: "Regular meat consumer", value: 1 },
        ],
      },
      {
        id: "food-2",
        text: "How often do you eat locally sourced food?",
        type: "single_choice",
        weight: 0.5,
        options: [
          { id: "f2-1", text: "Almost always", value: 5 },
          { id: "f2-2", text: "Often", value: 4 },
          { id: "f2-3", text: "Sometimes", value: 2 },
          { id: "f2-4", text: "Rarely", value: 1 },
        ],
      },
    ],
  },
  {
    id: "waste",
    title: "Waste Management",
    description: "Let's assess your waste habits",
    questions: [
      {
        id: "waste-1",
        text: "How much do you recycle?",
        type: "single_choice",
        weight: 0.6,
        options: [
          { id: "w1-1", text: "Everything possible", value: 5 },
          { id: "w1-2", text: "Most items", value: 4 },
          { id: "w1-3", text: "Some items", value: 2 },
          { id: "w1-4", text: "Rarely recycle", value: 1 },
        ],
      },
      {
        id: "waste-2",
        text: "How do you handle food waste?",
        type: "single_choice",
        weight: 0.4,
        options: [
          { id: "w2-1", text: "Compost everything", value: 5 },
          { id: "w2-2", text: "Some composting", value: 3 },
          { id: "w2-3", text: "Regular disposal", value: 1 },
        ],
      },
    ],
  },
  {
    id: "consumption",
    title: "Consumption Habits",
    description: "Let's evaluate your shopping habits",
    questions: [
      {
        id: "cons-1",
        text: "How often do you buy new clothes?",
        type: "single_choice",
        weight: 0.5,
        options: [
          { id: "c1-1", text: "Rarely/Second-hand", value: 5 },
          { id: "c1-2", text: "Few times a year", value: 4 },
          { id: "c1-3", text: "Monthly", value: 2 },
          { id: "c1-4", text: "Weekly", value: 1 },
        ],
      },
      {
        id: "cons-2",
        text: "Do you consider eco-friendly packaging when shopping?",
        type: "single_choice",
        weight: 0.5,
        options: [
          { id: "c2-1", text: "Always", value: 5 },
          { id: "c2-2", text: "Often", value: 4 },
          { id: "c2-3", text: "Sometimes", value: 2 },
          { id: "c2-4", text: "Never", value: 1 },
        ],
      },
    ],
  },
];