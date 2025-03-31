
import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const AuthButtons = () => {
  const { user, isAuthenticated, signOut } = useAuth();

  if (isAuthenticated && user) {
    // Get the user's name from the user metadata
    const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'User';
    
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <UserCircle className="h-5 w-5 text-university-700" />
          <span className="hidden md:inline text-sm font-medium truncate max-w-[140px]">
            {userName}
          </span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={signOut}
          className="flex items-center gap-1"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link to="/signin">
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
        >
          <LogIn className="h-4 w-4" />
          <span className="hidden sm:inline">Sign In</span>
        </Button>
      </Link>
      <Link to="/signup">
        <Button size="sm" className="flex items-center gap-1">
          <UserCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Sign Up</span>
        </Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
