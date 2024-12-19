const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-eco-light py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-sm text-gray-600 space-y-4">
          <p className="font-medium">
            Disclaimer: The results of this diagnostic tool are not intended to provide a measure of environmental sustainability impact derived from the degree of circularity attained by the organization.
          </p>
          <p>
            Developed by: Dr. Maria A. Franco / Bern University of Applied Sciences
            <br />
            Technical implementation by Moritz Maier
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;