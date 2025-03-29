
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FileQuestion, Home, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 text-center">
          <FileQuestion className="h-24 w-24 text-university-400 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for cannot be found.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-university-600 hover:bg-university-700">
                <Home className="mr-2 h-4 w-4" />
                Return to Home
              </Button>
            </Link>
            
            <Link to="/order">
              <Button variant="outline" className="border-university-300 text-university-700">
                <Printer className="mr-2 h-4 w-4" />
                Print Something
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
