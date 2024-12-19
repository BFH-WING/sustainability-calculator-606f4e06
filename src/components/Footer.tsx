const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-sm border-t border-eco-light py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-sm text-gray-600 space-y-4 ml-[40%]">
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
    </footer>
  );
};

export default Footer;