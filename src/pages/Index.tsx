
import React from 'react';
import { Link } from 'react-router-dom';
import { Printer, FileText, Clock, CreditCard, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const features = [
  {
    icon: <FileText className="h-6 w-6 text-university-600" />,
    title: 'Easy PDF Uploads',
    description: 'Upload your PDF documents in seconds',
  },
  {
    icon: <CreditCard className="h-6 w-6 text-university-600" />,
    title: 'Secure Payment',
    description: 'Pay online or with cash on delivery',
  },
  {
    icon: <Clock className="h-6 w-6 text-university-600" />,
    title: 'Quick Turnaround',
    description: 'Get your printouts within hours',
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-university-600" />,
    title: 'Quality Guarantee',
    description: 'High-quality prints every time',
  },
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-university-800 to-university-950 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-1/2 space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Fast & Reliable Printing for University Students
                </h1>
                <p className="text-lg text-gray-200 max-w-lg">
                  Upload your PDF, place your order, and get your printouts delivered to your classroom. It's that simple!
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/order">
                    <Button size="lg" className="bg-white text-university-900 hover:bg-gray-100">
                      Start Printing Now
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                      View Pricing
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="w-full max-w-md">
                  <img 
                    src="https://images.unsplash.com/photo-1571498664957-ffd24710ab3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Students printing documents" 
                    className="rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our printing service makes it easy to get your documents printed without leaving your desk
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="bg-white rounded-lg shadow-md p-8 md:w-1/4">
                <div className="flex items-center justify-center w-12 h-12 bg-university-100 rounded-full mb-4">
                  <span className="text-university-700 font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload Document</h3>
                <p className="text-gray-600">
                  Upload your PDF document to our secure platform
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8 md:w-1/4">
                <div className="flex items-center justify-center w-12 h-12 bg-university-100 rounded-full mb-4">
                  <span className="text-university-700 font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Customize Options</h3>
                <p className="text-gray-600">
                  Select your printing preferences and delivery location
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8 md:w-1/4">
                <div className="flex items-center justify-center w-12 h-12 bg-university-100 rounded-full mb-4">
                  <span className="text-university-700 font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Place Order</h3>
                <p className="text-gray-600">
                  Complete your payment online or select cash on delivery
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8 md:w-1/4">
                <div className="flex items-center justify-center w-12 h-12 bg-university-100 rounded-full mb-4">
                  <span className="text-university-700 font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Receive Printouts</h3>
                <p className="text-gray-600">
                  Get your printouts delivered to your specified location
                </p>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Link to="/order">
                <Button className="bg-university-600 hover:bg-university-700">
                  Start Your Order
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our printing service is designed specifically for university students, providing convenience and quality
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-university-100 rounded-full">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Students Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear from students who use our printing service
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 italic">
                      "PrintSyndicate has been a lifesaver for my last-minute assignments. The delivery to my classroom is super convenient!"
                    </p>
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-gray-500">Computer Science Major</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 italic">
                      "Quick, reliable, and the quality is great. I use this service for all my study materials now."
                    </p>
                    <div>
                      <p className="font-medium">Michael Chen</p>
                      <p className="text-sm text-gray-500">Business Administration</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 italic">
                      "The spiral binding option is perfect for my lab reports. Love that I can pay when I collect my documents."
                    </p>
                    <div>
                      <p className="font-medium">Emily Rodriguez</p>
                      <p className="text-sm text-gray-500">Engineering Student</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 bg-university-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to start printing?</h2>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Upload your document now and get it printed with just a few clicks
            </p>
            <Link to="/order">
              <Button size="lg" className="bg-white text-university-900 hover:bg-gray-100">
                <Printer className="mr-2 h-5 w-5" />
                Print Your Document
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
