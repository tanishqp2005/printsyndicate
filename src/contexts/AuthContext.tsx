
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
  requestOTP: (email: string) => Promise<boolean>;
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
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

  // Generate a 6-digit OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const requestOTP = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Validate email domain
      if (!email.endsWith('@sakec.ac.in')) {
        toast.error('Only @sakec.ac.in email addresses are allowed');
        setIsLoading(false);
        return false;
      }

      // Check if user exists or create a new user account
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = storedUsers.find((u: any) => u.email === email);
      
      // Generate OTP and store it
      const otp = generateOTP();
      const otpStorage = JSON.parse(localStorage.getItem('otps') || '{}');
      otpStorage[email] = {
        code: otp,
        expiresAt: Date.now() + 10 * 60 * 1000, // OTP valid for 10 minutes
      };
      localStorage.setItem('otps', JSON.stringify(otpStorage));
      
      // In a real application, this would send an email with the OTP
      // For demo purposes, we'll show it in a toast
      toast.info(`OTP sent to ${email}: ${otp}`);
      console.log(`OTP for ${email}: ${otp}`); // For testing purposes
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Request OTP error:', error);
      toast.error('Failed to send OTP');
      setIsLoading(false);
      return false;
    }
  };

  const verifyOTP = async (email: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Validate email domain again as a safety check
      if (!email.endsWith('@sakec.ac.in')) {
        toast.error('Only @sakec.ac.in email addresses are allowed');
        setIsLoading(false);
        return false;
      }

      // Check OTP validity
      const otpStorage = JSON.parse(localStorage.getItem('otps') || '{}');
      const storedOTP = otpStorage[email];
      
      if (!storedOTP) {
        toast.error('No OTP requested for this email');
        setIsLoading(false);
        return false;
      }
      
      if (Date.now() > storedOTP.expiresAt) {
        toast.error('OTP has expired, please request a new one');
        // Remove expired OTP
        delete otpStorage[email];
        localStorage.setItem('otps', JSON.stringify(otpStorage));
        setIsLoading(false);
        return false;
      }
      
      if (storedOTP.code !== otp) {
        toast.error('Invalid OTP, please try again');
        setIsLoading(false);
        return false;
      }
      
      // OTP is valid, clear it from storage
      delete otpStorage[email];
      localStorage.setItem('otps', JSON.stringify(otpStorage));
      
      // Check if user exists or create a new one
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      let user = storedUsers.find((u: any) => u.email === email);
      
      if (!user) {
        // Create new user with email as name (can be updated later)
        const username = email.split('@')[0];
        user = {
          id: `user-${Date.now()}`,
          email,
          name: username,
        };
        storedUsers.push(user);
        localStorage.setItem('users', JSON.stringify(storedUsers));
      }
      
      // Set user session
      const { password: _, ...userWithoutPassword } = user;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      toast.success('Signed in successfully');
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Verify OTP error:', error);
      toast.error('Failed to verify OTP');
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
        requestOTP,
        verifyOTP,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
