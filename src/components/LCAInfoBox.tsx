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
              LCA is a standardized method (ISO 14040) to measure and improve your product's environmental impact throughout its lifecycle. Our assessment helps identify:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Key environmental impacts</li>
              <li>Improvement opportunities</li>
              <li>Cost-saving potential</li>
            </ul>
            <p className="mt-4">
              Get ahead of regulations and enhance your market position with an LCA certification.
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