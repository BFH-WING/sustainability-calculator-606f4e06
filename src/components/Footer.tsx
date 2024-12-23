const Footer = () => {
  return (
    <div className="w-full border-t border-eco-light bg-white/80">
      <div className="max-w-6xl mx-auto p-6">
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
              Developed by: <a href="https://www.bfh.ch/de/ueber-die-bfh/personen/iqgcoyge3rvz/" className="text-eco-primary hover:text-eco-dark underline" target="_blank" rel="noopener noreferrer">Dr. Maria A. Franco</a>
              <br />
              Bern University of Applied Sciences - <a 
                href="https://www.bfh.ch/de/themen/circular-economy-labs-ce-lab/" 
                className="text-gray-500 hover:text-eco-primary underline" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Circular Economy Lab
              </a>
              <br />
              Implemented by: <a href="https://www.bfh.ch/de/ueber-die-bfh/personen/hjv2xroqxwn5/" className="text-eco-primary hover:text-eco-dark underline" target="_blank" rel="noopener noreferrer">Moritz Maier</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;