import { BFHLogo } from "@/assets/BFHLogo";

const Footer = () => {
  return (
    <div className="p-6 border-t border-eco-light bg-white/80 mt-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-sm text-gray-600 space-y-4">
          <p className="font-medium">
            Disclaimer: The results of this diagnostic tool are not intended to provide a measure of environmental sustainability impact derived from the degree of circularity attained by the organization.
          </p>
          <div className="flex items-center space-x-4 pt-4">
            <img
              src="/lovable-uploads/7455dfcd-9f33-41c8-b39e-3c6eef31dbac.png"
              alt="BFH Logo"
              className="h-12 object-contain"
            />
            <p>
              Developed by: Dr. Maria A. Franco
              <br />
              Implemented by: Moritz Maier
              <br />
              Bern University of Applied Sciences
              <br />
              <span className="text-gray-500">
                Industrial Engineering and Management Science (WING)
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;