
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FileUpload from '@/components/FileUpload';
import OrderForm from '@/components/OrderForm';
import OrderSummary from '@/components/OrderSummary';
import PaymentForm from '@/components/PaymentForm';
import OrderProgress from '@/components/OrderProgress';
import OrderConfirmation from '@/components/OrderConfirmation';

// Define the PrintOptions type to ensure consistent usage
export type PrintOptions = {
  copies: string;
  color: 'bw' | 'color';
  doubleSided: 'single' | 'double';
  pageSize: 'a4' | 'a3' | 'letter';
  binding: 'none' | 'staple' | 'spiral';
};

// Define the FileDetail type
interface FileDetail {
  fileName: string;
  fileSize: number;
  pageCount: number;
}

const formSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10),
  classroom: z.string().min(1),
  printOptions: z.object({
    copies: z.string().min(1),
    color: z.enum(['bw', 'color']),
    doubleSided: z.enum(['single', 'double']),
    pageSize: z.enum(['a4', 'a3', 'letter']),
    binding: z.enum(['none', 'staple', 'spiral']),
  }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const OrderPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileDetails, setFileDetails] = useState<FileDetail[]>([]);
  const [orderDetails, setOrderDetails] = useState<FormValues | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderNumber, setOrderNumber] = useState('');

  // Define default print options with all required properties
  const defaultPrintOptions: PrintOptions = {
    copies: '1',
    color: 'bw',
    doubleSided: 'single',
    pageSize: 'a4',
    binding: 'none',
  };

  const handleFilesSelect = (files: File[]) => {
    setSelectedFiles(files);
    
    // Process each file to calculate page count
    const details = files.map(file => {
      // Simulate calculating page count from the file size
      // In a real application, you would use a PDF library to extract this information
      const estimatedPageCount = Math.floor(file.size / 40000); // Rough estimate
      
      return {
        fileName: file.name,
        fileSize: file.size,
        pageCount: Math.max(1, estimatedPageCount)
      };
    });
    
    setFileDetails(details);
    
    if (files.length > 0) {
      setTimeout(() => {
        setStep(2);
      }, 500);
    } else {
      setStep(1);
    }
  };

  const calculatePrice = (details: FormValues) => {
    // Calculate total page count
    const totalPageCount = fileDetails.reduce((total, file) => total + file.pageCount, 0);
    
    // Base price calculated at 2 rupees per page
    let price = totalPageCount * 2;
    
    // Add color printing price
    if (details.printOptions.color === 'color') {
      price += 2.00;
    }
    
    // Add binding price
    if (details.printOptions.binding === 'staple') {
      price += 0.50;
    } else if (details.printOptions.binding === 'spiral') {
      price += 3.00;
    }
    
    // Multiply by number of copies
    price = price * parseInt(details.printOptions.copies || '1');
    
    return price;
  };

  const handleFormSubmit = (data: FormValues) => {
    setOrderDetails(data);
    const price = calculatePrice(data);
    setTotalPrice(price);
    setStep(3);
    
    // Simulate sending email to stationery operator
    console.log('Sending order details to stationery operator:', {
      files: selectedFiles,
      fileDetails: fileDetails,
      details: data,
      price: price,
      totalPageCount: fileDetails.reduce((total, file) => total + file.pageCount, 0)
    });
  };

  const handlePaymentComplete = () => {
    // Generate random order number
    const randomOrderNum = 'PS' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(randomOrderNum);
    
    // Simulate email confirmation
    if (orderDetails) {
      console.log('Sending confirmation email to:', orderDetails.email);
    }
    
    toast.success('Order placed successfully!');
    setStep(4);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <OrderProgress currentStep={step} />
            
            <div className="mt-8">
              {step === 1 && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Upload Your Documents</h1>
                  <p className="text-gray-600 mb-6">
                    Please upload the PDF documents you want to print. We accept files up to 20MB in size each.
                  </p>
                  <FileUpload onFilesSelect={handleFilesSelect} />
                </div>
              )}
              
              {step === 2 && selectedFiles.length > 0 && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Order Details</h1>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <OrderForm onSubmit={handleFormSubmit} />
                    </div>
                    <div>
                      <OrderSummary
                        files={fileDetails}
                        printOptions={defaultPrintOptions}
                        totalPrice={3.50}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {step === 3 && selectedFiles.length > 0 && orderDetails && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Payment</h1>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <PaymentForm onSubmit={handlePaymentComplete} />
                    </div>
                    <div>
                      <OrderSummary
                        files={fileDetails}
                        printOptions={orderDetails.printOptions as PrintOptions}
                        totalPrice={totalPrice}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {step === 4 && (
                <div>
                  <h1 className="text-2xl font-bold mb-6 text-center">Order Confirmed</h1>
                  <OrderConfirmation
                    orderNumber={orderNumber}
                    orderDate={new Date()}
                    estimatedDelivery={new Date(Date.now() + 24 * 60 * 60 * 1000)} // 24 hours from now
                    location={orderDetails?.classroom || 'Your specified location'}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderPage;
