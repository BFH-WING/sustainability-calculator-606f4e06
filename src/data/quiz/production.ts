import { QuizSection } from "../../types/quiz";

export const productionSection: QuizSection = {
  id: "production",
  title: "Circular production",
  description: "Evaluation of production processes",
  questions: [
    {
      id: "prod-1",
      text: "What percentage of the organization's consumed energy comes from renewable sources?",
      subcategory: "Energy",
      type: "percentage",
      weight: 0.7,
      options: [
        { id: "p1-1", text: "Solar (0-100%)", value: 100 },
        { id: "p1-2", text: "Wind (0-100%)", value: 100 },
        { id: "p1-3", text: "Geothermal (0-100%)", value: 80 },
        { id: "p1-4", text: "Biomass (0-100%)", value: 60 },
        { id: "p1-5", text: "Other (0-100%)", value: 40 },
        { id: "p1-6", text: "I don't know", value: 0 }
      ]
    },
    {
      id: "prod-2",
      text: "What percentage of the organization's consumed water is recirculated internally?",
      subcategory: "Water",
      type: "percentage",
      weight: 0.3,
      options: [
        { id: "p2-1", text: "0-100%", value: 100 },
        { id: "p2-2", text: "I don't know", value: 0 },
        { id: "p2-3", text: "Does not apply", value: 0 }
      ]
    },
    {
      id: "prod-3",
      text: "What percentage of your operation's residual waste and/or by-products are fed back to operations?",
      description: "Examples: fly ash, steam, CO2, waste heat, chemicals",
      subcategory: "Flow of production waste",
      type: "percentage",
      weight: 0.5,
      options: [
        { id: "p3-1", text: "Own operations (0-100%)", value: 100 },
        { id: "p3-2", text: "Other organization's operations (0-100%)", value: 80 },
        { id: "p3-3", text: "I don't know", value: 0 },
        { id: "p3-4", text: "Does not apply", value: 0 }
      ]
    },
    {
      id: "prod-4",
      text: "What is the recycling rate of the organization's industrial solid waste?",
      description: "Calculated by dividing the weight of the recycled industrial waste by the weight of the total waste generated",
      subcategory: "Industrial waste",
      type: "percentage",
      weight: 0.5,
      options: [
        { id: "p4-1", text: "0-100%", value: 100 },
        { id: "p4-2", text: "I don't know", value: 0 },
        { id: "p4-3", text: "Does not apply", value: 0 }
      ],
      source_url: "https://www.sciencedirect.com/science/article/pii/S2525609230014588"
    },
    {
      id: "prod-5",
      text: "What packaging type do you use for the analyzed product?",
      subcategory: "Packaging type",
      type: "single_choice",
      weight: 0.5,
      options: [
        { id: "p5-1", text: "Reusable", value: 100 },
        { id: "p5-2", text: "Biodegradable", value: 80 },
        { id: "p5-3", text: "Fully recyclable", value: 60 },
        { id: "p5-4", text: "Partially recyclable", value: 40 },
        { id: "p5-5", text: "Not recyclable", value: 0 }
      ]
    }
  ]
};