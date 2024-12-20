import { InfoIcon } from "lucide-react";
import LCARequestDialog from "./LCARequestDialog";

const LCAInfoBox = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-start gap-4">
        <InfoIcon className="h-6 w-6 text-eco-primary flex-shrink-0 mt-1" />
        <div className="space-y-4 flex-1 min-w-0">
          <h2 className="text-xl font-semibold text-gray-900">Need a Life Cycle Assessment?</h2>
          <div className="space-y-2 text-gray-600">
            <p>
              LCA is a standardized method (ISO 14040) that helps measure and reduce the environmental footprint of your products and services. Our assessment helps identify:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Key environmental impacts</li>
              <li>Improvement opportunities</li>
              <li>Cost-saving potential</li>
            </ul>
            <p className="mt-4">
              BFH can help you enhance your market position and meet sustainability goals through expert LCA guidance.
            </p>
          </div>
          <div className="pt-4 w-full">
            <LCARequestDialog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LCAInfoBox;