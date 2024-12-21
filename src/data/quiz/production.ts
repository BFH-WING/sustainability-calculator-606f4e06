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
      weight: 0.30, // Balanced with other production aspects
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
      weight: 0.20, // Important but less complex than other aspects
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
      weight: 0.25, // Significant impact on circular economy
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
      weight: 0.25, // Equal weight with production waste flow
      options: [
        { id: "p4-1", text: "0-100%", value: 100 },
        { id: "p4-2", text: "I don't know", value: 0 },
        { id: "p4-3", text: "Does not apply", value: 0 }
      ],
      source_url: "https://www.sciencedirect.com/science/article/pii/S2525609230014588"
    }
  ]
};