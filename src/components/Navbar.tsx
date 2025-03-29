
import React from 'react';
import { Link } from 'react-router-dom';
import { Printer } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Printer className="h-6 w-6 text-university-700" />
          <span className="font-bold text-xl text-university-900">PrintSyndicate</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-university-600 transition-colors">
            Home
          </Link>
          <Link to="/pricing" className="text-gray-700 hover:text-university-600 transition-colors">
            Pricing
          </Link>
          <Link to="/faq" className="text-gray-700 hover:text-university-600 transition-colors">
            FAQ
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-university-600 transition-colors">
            Contact
          </Link>
        </nav>
        <div className="flex gap-3">
          <Link
            to="/order"
            className="bg-university-600 hover:bg-university-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Print Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
