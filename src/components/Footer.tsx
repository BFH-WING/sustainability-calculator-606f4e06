const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-eco-light py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-sm text-gray-600 space-y-4">
          <p className="font-medium">
            Disclaimer: The results of this diagnostic tool are not intended to provide a measure of environmental sustainability impact derived from the degree of circularity attained by the organization.
          </p>
          <div className="flex items-center space-x-4 pt-4">
            <img 
              src="/lovable-uploads/31dd0615-2cb1-457e-8666-ab7e80dbcfe4.png" 
              alt="BFH Logo" 
              className="h-12 object-contain"
            />
            <p>
              Developed by: Dr. Maria A. Franco / Bern University of Applied Sciences
              <br />
              Technical implementation by Moritz Maier
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;