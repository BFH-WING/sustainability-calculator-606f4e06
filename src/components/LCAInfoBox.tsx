import { InfoIcon } from "lucide-react";
import LCARequestDialog from "./LCARequestDialog";

const LCAInfoBox = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-start gap-4">
        <InfoIcon className="h-6 w-6 text-eco-primary flex-shrink-0 mt-1" />
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Life Cycle Assessment (LCA)</h2>
          <div className="space-y-2 text-gray-600">
            <p>
              Life Cycle Assessment is an internationally standardised methodology (ISO 14040) that helps quantify environmental impacts related to products and services. It takes into account the entire life cycle of your product, identifying:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Environmental impacts and benefits</li>
              <li>Potential trade-offs</li>
              <li>Areas for improvement</li>
            </ul>
            <p className="mt-4">
              Companies increasingly use LCAs to reduce their overall environmental impact, improve product competitiveness, and apply for environmental certifications.
            </p>
          </div>
          <div className="pt-4">
            <LCARequestDialog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LCAInfoBox;