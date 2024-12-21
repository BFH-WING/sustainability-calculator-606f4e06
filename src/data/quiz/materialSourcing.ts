import { QuizSection } from "../../types/quiz";

export const materialSourcingSection: QuizSection = {
  id: "material-sourcing",
  title: "Circular material sourcing",
  description: "Assessment of material sourcing practices",
  questions: [
    {
      id: "sourcing-1",
      text: "What are the primary geographical locations where the organization sources its materials from?",
      description: "Applied to virgin, reused/upcycled, recycled, and biodegradable materials",
      subcategory: "Geographical proximity of sourcing",
      type: "percentage",
      weight: 0.60, // Higher weight due to environmental impact
      options: [
        { id: "s1-1", text: "Countries outside of Europe (0-100%)", value: 20 },
        { id: "s1-2", text: "Other european countries (0-100%)", value: 40 },
        { id: "s1-3", text: "Switzerland's neighboring countries (0-100%)", value: 60 },
        { id: "s1-4", text: "Switzerland (0-100%)", value: 80 },
        { id: "s1-5", text: "Same canton as HQ (0-100%)", value: 100 },
        { id: "s1-6", text: "I don't know", value: 0 }
      ]
    },
    {
      id: "sourcing-2",
      text: "What modes of transportation are used for the different sourcing locations?",
      subcategory: "Modes of transport",
      type: "percentage",
      weight: 0.40, // Complementary to geographical sourcing
      options: [
        { id: "s2-1", text: "Air (0-100%)", value: 20 },
        { id: "s2-2", text: "Maritime (0-100%)", value: 40 },
        { id: "s2-3", text: "Rail (0-100%)", value: 80 },
        { id: "s2-4", text: "Road (0-100%)", value: 60 },
        { id: "s2-5", text: "Other (0-100%)", value: 40 },
        { id: "s2-6", text: "I don't know", value: 0 }
      ]
    }
  ]
};