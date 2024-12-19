import { QuizSection } from "../types/quiz";

export const circularityQuestions: QuizSection[] = [
  {
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
        options: [
          { id: "d1-1", text: "2-5", value: 5 },
          { id: "d1-2", text: "6-9", value: 4 },
          { id: "d1-3", text: "10-13", value: 3 },
          { id: "d1-4", text: "More than 13", value: 2 },
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
        description: "100% separable joints and full accessibility",
        subcategory: "Design for disassembly and modularity",
        type: "single_choice",
        options: [
          { id: "d3-1", text: "Excellent (75-95% separable joints and accessibility)", value: 5 },
          { id: "d3-2", text: "Good (50-75% separable joints)", value: 4 },
          { id: "d3-3", text: "Fair (Less than 49% of separable joints)", value: 3 },
          { id: "d3-4", text: "Poor (0% separable joints)", value: 2 },
          { id: "d3-5", text: "Null", value: 1 },
          { id: "d3-6", text: "I don't know", value: 0 }
        ],
        source_url: "https://www.sciencedirect.com/science/article/pii/S0959652623005029"
      }
    ]
  },
  {
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
        options: [
          { id: "s1-1", text: "Countries outside of Europe (0-100%)", value: 1 },
          { id: "s1-2", text: "Other european countries (0-100%)", value: 2 },
          { id: "s1-3", text: "Switzerland's neighboring countries (0-100%)", value: 3 },
          { id: "s1-4", text: "Switzerland (0-100%)", value: 4 },
          { id: "s1-5", text: "Same canton as HQ (0-100%)", value: 5 },
          { id: "s1-6", text: "I don't know", value: 0 }
        ]
      },
      {
        id: "sourcing-2",
        text: "What modes of transportation are used for the different sourcing locations?",
        subcategory: "Modes of transport",
        type: "percentage",
        options: [
          { id: "s2-1", text: "Air (0-100%)", value: 1 },
          { id: "s2-2", text: "Maritime (0-100%)", value: 2 },
          { id: "s2-3", text: "Rail (0-100%)", value: 4 },
          { id: "s2-4", text: "Road (0-100%)", value: 3 },
          { id: "s2-5", text: "Other (0-100%)", value: 2 },
          { id: "s2-6", text: "I don't know", value: 0 }
        ]
      }
    ]
  },
  {
    id: "production",
    title: "Circular production",
    description: "Evaluation of production processes",
    questions: [
      {
        id: "prod-1",
        text: "What percentage of the organization's consumed energy comes from renewable sources?",
        subcategory: "Energy",
        type: "percentage",
        options: [
          { id: "p1-1", text: "Solar (0-100%)", value: 5 },
          { id: "p1-2", text: "Wind (0-100%)", value: 5 },
          { id: "p1-3", text: "Geothermal (0-100%)", value: 4 },
          { id: "p1-4", text: "Biomass (0-100%)", value: 3 },
          { id: "p1-5", text: "Other (0-100%)", value: 2 },
          { id: "p1-6", text: "I don't know", value: 0 }
        ]
      },
      {
        id: "prod-2",
        text: "What percentage of the organization's consumed water is recirculated internally?",
        subcategory: "Water",
        type: "percentage",
        options: [
          { id: "p2-1", text: "0-100%", value: 5 },
          { id: "p2-2", text: "I don't know", value: 0 },
          { id: "p2-3", text: "Does not apply", value: 0 }
        ]
      }
    ]
  },
  {
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
        options: [
          { id: "e1-1", text: "Sharing (0-100%)", value: 5 },
          { id: "e1-2", text: "Rental/Leasing (0-100%)", value: 4 },
          { id: "e1-3", text: "Repair (0-100%)", value: 3 },
          { id: "e1-4", text: "Second hand market/Remanufacturing (0-100%)", value: 2 },
          { id: "e1-5", text: "Traditional product sale (0-100%)", value: 1 },
          { id: "e1-6", text: "I don't know", value: 0 }
        ]
      },
      {
        id: "eol-2",
        text: "What is the commercial availability of spare parts?",
        description: "Full spare-parts stock available from the manufacturer or its dealers",
        subcategory: "Lifetime extension through repair",
        type: "single_choice",
        options: [
          { id: "e2-1", text: "Excellent", value: 5 },
          { id: "e2-2", text: "Good", value: 4 },
          { id: "e2-3", text: "Fair", value: 3 },
          { id: "e2-4", text: "Poor", value: 2 },
          { id: "e2-5", text: "Null", value: 1 },
          { id: "e2-6", text: "I don't know", value: 0 }
        ]
      }
    ]
  }
];