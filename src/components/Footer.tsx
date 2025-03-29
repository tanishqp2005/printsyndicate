
import React from 'react';
import { Link } from 'react-router-dom';
import { Printer } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <Link to="/" className="flex items-center gap-2 justify-center mb-4">
            <Printer className="h-6 w-6 text-university-700" />
            <span className="font-bold text-xl text-university-900">PrintSyndicate</span>
          </Link>
          <p className="text-gray-600 mb-4">
            Fast, reliable printing services for university students.
          </p>
          <div className="text-gray-500">
            &copy; {currentYear} PrintSyndicate. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
