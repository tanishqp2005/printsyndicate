
import React from 'react';
import { Link } from 'react-router-dom';
import { Printer, ShoppingBag, User } from 'lucide-react';
import AuthButtons from './AuthButtons';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Printer className="h-6 w-6 text-university-700" />
          <span className="font-bold text-xl text-university-900">PrintSyndicate</span>
        </Link>
        <div className="flex gap-3 items-center">
          {isAuthenticated && (
            <>
              <Link
                to="/orders"
                className="flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-university-700 transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="hidden sm:inline">Orders</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-university-700 transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
            </>
          )}
          <AuthButtons />
          {isAuthenticated && (
            <Link
              to="/order"
              className="bg-university-600 hover:bg-university-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Print Now
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
