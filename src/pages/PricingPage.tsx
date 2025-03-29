
import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const pricingOptions = [
  {
    title: 'Standard Printing',
    description: 'Basic black & white printing',
    price: '$0.10',
    unit: 'per page',
    features: [
      'Black & White Printing',
      'A4 Paper',
      'Single-sided',
      'Regular Paper (80gsm)',
      'Self Service Collection',
    ],
    popular: false,
  },
  {
    title: 'Color Printing',
    description: 'Full color printing for presentations',
    price: '$0.25',
    unit: 'per page',
    features: [
      'Full Color Printing',
      'A4 Paper',
      'Single-sided',
      'High Quality Paper (100gsm)',
      'Self Service Collection',
      'Classroom Delivery Available',
    ],
    popular: true,
  },
  {
    title: 'Document Binding',
    description: 'Professional binding services',
    price: '$3.00',
    unit: 'and up',
    features: [
      'Spiral Binding',
      'Stapling Available',
      'Cover Page Options',
      'Multiple Size Options',
      'Classroom Delivery Included',
      'Rush Service Available',
    ],
    popular: false,
  },
];

const additionalServices = [
  { service: 'Double-sided printing', price: '$0.18 per sheet (B&W)', note: 'Count as 2 pages' },
  { service: 'Double-sided color printing', price: '$0.45 per sheet', note: 'Count as 2 pages' },
  { service: 'A3 Printing (B&W)', price: '$0.20 per page', note: '' },
  { service: 'A3 Printing (Color)', price: '$0.50 per page', note: '' },
  { service: 'Stapling', price: '$0.50 per document', note: 'Up to 40 pages' },
  { service: 'Spiral Binding', price: '$3.00 - $6.00', note: 'Based on page count' },
  { service: 'Lamination (A4)', price: '$1.50 per sheet', note: '' },
  { service: 'Classroom Delivery', price: 'Free', note: 'With orders over $5' },
];

const PricingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Printing Service Pricing</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Affordable printing options for all university students. 
              Choose the service that best fits your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {pricingOptions.map((option, index) => (
              <Card key={index} className={`relative ${option.popular ? 'border-university-500 shadow-lg' : ''}`}>
                {option.popular && (
                  <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-university-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{option.price}</span>
                    <span className="text-gray-500"> {option.unit}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/order" className="w-full">
                    <Button 
                      className={`w-full ${option.popular ? 'bg-university-600 hover:bg-university-700' : ''}`}
                    >
                      Start Printing
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Additional Services</h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="py-3 px-6 text-left text-gray-600 font-medium">Service</th>
                    <th className="py-3 px-6 text-left text-gray-600 font-medium">Price</th>
                    <th className="py-3 px-6 text-left text-gray-600 font-medium">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {additionalServices.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-6">{item.service}</td>
                      <td className="py-4 px-6 font-medium">{item.price}</td>
                      <td className="py-4 px-6 text-gray-500">{item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Bulk Printing Discounts</h3>
              <p className="mb-4 text-gray-600">
                Need to print a large document or multiple copies? We offer discounts for bulk printing:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>10% off for orders over 100 pages</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>15% off for orders over 250 pages</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>20% off for orders over 500 pages</span>
                </li>
              </ul>
              <p className="text-gray-600">
                Please contact us for custom quotes on large printing jobs or special requirements.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PricingPage;
