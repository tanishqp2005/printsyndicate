
import React from 'react';
import { Link } from 'react-router-dom';
import { Printer, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <Printer className="h-6 w-6 text-university-700" />
              <span className="font-bold text-xl text-university-900">PrintSyndicate</span>
            </Link>
            <p className="mt-3 text-gray-600">
              Fast, reliable printing services for university students.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-university-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-university-600 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-university-600 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-university-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Document Printing</li>
              <li className="text-gray-600">Color Printing</li>
              <li className="text-gray-600">Binding Services</li>
              <li className="text-gray-600">Large Format Printing</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-university-600 shrink-0 mt-0.5" />
                <span className="text-gray-600">Student Union Building, University Campus</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-university-600 shrink-0" />
                <span className="text-gray-600">print@university.edu</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-university-600 shrink-0" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500">
          &copy; {currentYear} PrintSyndicate. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
