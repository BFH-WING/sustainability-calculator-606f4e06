import { QuizSection } from "../../types/quiz";

export const circularDesignSection: QuizSection = {
  id: "circular-design",
  title: "Circular design and materials",
  description: "Evaluation of product design and material choices",
  questions: [
    {
      id: "design-1",
      text: "How many materials (or material groups) does the product(s) contain?",
      description: "Products generally consist of different materials that are distributed throughout the product, e.g. in different components",
      subcategory: "Complexity of product architecture",
      type: "single_choice",
      weight: 0.15,
      options: [
        { id: "d1-1", text: "2-5", value: 5 },
        { id: "d1-2", text: "6-9", value: 3 },
        { id: "d1-3", text: "10-13", value: 2 },
        { id: "d1-4", text: "More than 13", value: 1 },
        { id: "d1-5", text: "I don't know", value: 0 }
      ],
      source_url: "https://www.sciencedirect.com/science/article/pii/S0959652621041408"
    },
    {
      id: "design-2",
      text: "What is the product(s)' relative weight relative to comparable products in the market?",
      description: "Circular design demand less materials for the same performance and quality",
      subcategory: "Material efficiency",
      type: "single_choice",
      weight: 0.15,
      options: [
        { id: "d2-1", text: "50% less", value: 5 },
        { id: "d2-2", text: "25% less", value: 4 },
        { id: "d2-3", text: "1x same weight", value: 3 },
        { id: "d2-4", text: "1.5x more", value: 2 },
        { id: "d2-5", text: "2x more", value: 1 },
        { id: "d2-6", text: "I don't know", value: 0 }
      ],
      source_url: "https://www.tandfonline.com/doi/pdf/10.1080/19397038.2017.1333543?needAccess=true"
    },
    {
      id: "design-3",
      text: "How modular is the product(s)' design so that it facilitates rapid disassembly and assembly of its parts?",
      subcategory: "Design for disassembly and modularity",
      type: "single_choice",
      weight: 0.20,
      options: [
        { id: "d3-1", text: "Excellent (75-95% separable joints and accessibility)", value: 5 },
        { id: "d3-2", text: "Good (50-75% separable joints)", value: 4 },
        { id: "d3-3", text: "Fair (Less than 49% of separable joints)", value: 2 },
        { id: "d3-4", text: "Poor (0% separable joints)", value: 1 },
        { id: "d3-5", text: "I don't know", value: 0 }
      ],
      source_url: "https://www.sciencedirect.com/science/article/pii/S0959652623005029"
    },
    {
      id: "design-4",
      text: "What is the product(s)' average lifetime relative to the industry average?",
      description: "Product lifetime comparison",
      subcategory: "Design for durability",
      type: "single_choice",
      weight: 0.20,
      options: [
        { id: "d4-1", text: "2x more", value: 5 },
        { id: "d4-2", text: "1.5x more", value: 4 },
        { id: "d4-3", text: "1x equal lifetime", value: 3 },
        { id: "d4-4", text: "25% less", value: 2 },
        { id: "d4-5", text: "50% less", value: 1 },
        { id: "d4-6", text: "I don't know", value: 0 }
      ]
    },
    {
      id: "design-5",
      text: "What is the material composition of your product(s)?",
      description: "Distribution of material types by weight relative to total material inflow weight. Categories are mutually exclusive.",
      subcategory: "Material composition",
      type: "percentage",
      weight: 0.20,
      options: [
        { id: "d5-1", text: "Virgin material content (0-100%)", value: 20 },
        { id: "d5-2", text: "Reused/upcycled material content (0-100%)", value: 100 },
        { id: "d5-3", text: "Recycled material content (0-100%)", value: 80 },
        { id: "d5-4", text: "Biodegradable/renewable material content (0-100%)", value: 60 },
        { id: "d5-5", text: "I don't know", value: 0 }
      ],
      source_url: "Note: The ideal circular product would minimize virgin material and maximize reused, recycled, and biodegradable/renewable content. Scoring is based on the overall composition, with more points for higher percentages of circular materials."
    },
    {
      id: "design-6",
      text: "Does your product contain any substance of concern (SoCs)?",
      description: "Hazardous chemicals in products that impede recycling and reuse, with the aim to boost product's circularity",
      subcategory: "Hazardous substances",
      type: "single_choice",
      weight: 0.10,
      options: [
        { id: "d6-1", text: "Yes", value: 1 },
        { id: "d6-2", text: "No", value: 5 },
        { id: "d6-3", text: "I don't know", value: 0 }
      ],
      source_url: "Compare the identified hazardous substances and their concentrations against regulatory thresholds or industry standards for what is considered a hazardous product"
    }
  ]
};