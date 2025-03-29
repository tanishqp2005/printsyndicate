
import React from 'react';
import { Link } from 'react-router-dom';
import { Printer } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <Printer className="h-6 w-6 text-university-700" />
              <span className="font-bold text-xl text-university-900">PrintSyndicate</span>
            </Link>
            <p className="mt-3 text-gray-600">
              Fast, reliable printing services for university students.
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <div className="mt-8 pt-6 border-t border-gray-200 text-gray-500">
              &copy; {currentYear} PrintSyndicate. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
