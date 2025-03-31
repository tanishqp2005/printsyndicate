
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, name: string, password: string) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real application, this would be an API call to authenticate
      // For now, we'll simulate a successful login if the email is in our mock DB
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const user = storedUsers.find((u: any) => 
        u.email === email && u.password === password
      );
      
      if (!user) {
        toast.error('Invalid email or password');
        setIsLoading(false);
        return false;
      }
      
      // Remove password before storing in state
      const { password: _, ...userWithoutPassword } = user;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      toast.success('Signed in successfully');
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('Failed to sign in');
      setIsLoading(false);
      return false;
    }
  };

  const signUp = async (email: string, name: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Validate email domain
      if (!email.endsWith('@sakec.ac.in')) {
        toast.error('Only @sakec.ac.in email addresses are allowed');
        setIsLoading(false);
        return false;
      }

      // In a real application, this would be an API call to register
      // For now, we'll simulate storing the user in localStorage
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if email already exists
      if (storedUsers.some((user: any) => user.email === email)) {
        toast.error('Email already registered');
        setIsLoading(false);
        return false;
      }
      
      const newUser = {
        id: `user-${Date.now()}`,
        email,
        name,
        password // In a real app, this would be hashed
      };
      
      storedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));
      
      // Remove password before storing in state
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      toast.success('Account created successfully');
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('Failed to create account');
      setIsLoading(false);
      return false;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Signed out successfully');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
