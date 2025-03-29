
import React from 'react';
import { Link } from 'react-router-dom';
import { Printer, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const faqs = [
  {
    question: 'How do I place a print order?',
    answer: 'You can place a print order by clicking on the "Print Now" button on the homepage. Then, upload your PDF document, fill in your personal details and print options, and complete the payment process. Your order will be sent to our printing staff, who will prepare your printouts for delivery or pickup.',
  },
  {
    question: 'What file formats do you accept?',
    answer: 'Currently, we only accept PDF files to ensure consistent formatting and print quality. Please convert your documents to PDF format before uploading them to our system.',
  },
  {
    question: 'How long does it take to get my printouts?',
    answer: 'Standard print orders are typically ready within 2-4 hours during business hours (8 AM - 6 PM, Monday through Friday). Orders placed after 4 PM may be processed the next business day. If you need your printouts urgently, please indicate this in the additional notes section during checkout.',
  },
  {
    question: 'How do I pay for my print order?',
    answer: 'We offer two payment options: online payment via credit/debit card or cash on delivery. You can select your preferred payment method during the checkout process.',
  },
  {
    question: 'Where can I pick up my printouts?',
    answer: 'You can choose to have your printouts delivered to your classroom or pick them up from one of our service locations on campus. Available pickup locations include the University Library, Student Union, Science Building, Engineering Block, and Arts & Humanities Centre.',
  },
  {
    question: 'Can I cancel or modify my order?',
    answer: 'Orders can be cancelled or modified within 15 minutes of submission. After this period, your order will be processed, and changes may not be possible. To cancel or modify your order, please contact our customer service team with your order number.',
  },
  {
    question: 'Do you offer binding services?',
    answer: 'Yes, we offer various binding options including stapling and spiral binding. You can select your preferred binding option during the order process. Prices vary depending on the type of binding and number of pages.',
  },
  {
    question: 'What if there\'s an issue with my printouts?',
    answer: 'If you encounter any issues with your print order, please contact us within 24 hours of receiving your printouts. We\'ll work to resolve the issue as quickly as possible, which may include reprinting your documents free of charge if the error was on our part.',
  },
  {
    question: 'Do you offer discounts for large orders?',
    answer: 'Yes, we offer discounts for bulk printing: 10% off for orders over 100 pages, 15% off for orders over 250 pages, and 20% off for orders over 500 pages. For very large orders or special requirements, please contact us for a custom quote.',
  },
  {
    question: 'What are your business hours?',
    answer: 'Our printing service operates from 8 AM to 6 PM, Monday through Friday. Orders placed outside these hours will be processed on the next business day.',
  },
];

const FaqPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <HelpCircle className="h-12 w-12 text-university-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our printing service.
              If you can't find what you're looking for, feel free to contact us.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto mb-12">
            <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm border">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="px-6 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
              <p className="text-gray-600 mb-6">
                We're here to help. Feel free to contact us for any questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact">
                  <Button variant="default" className="w-full sm:w-auto">
                    Contact Us
                  </Button>
                </Link>
                <Link to="/order">
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto border-university-300 text-university-700"
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Start Printing Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FaqPage;
