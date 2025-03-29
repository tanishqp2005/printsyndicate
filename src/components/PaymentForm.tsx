
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CreditCard, Calendar, IndianRupee, Banknote } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentFormProps {
  onSubmit: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'upi'>('card');
  const [loading, setLoading] = useState(false);
  const [paymentLocation, setPaymentLocation] = useState("");

  const locations = [
    { value: 'library', label: 'University Library' },
    { value: 'union', label: 'Student Union' },
    { value: 'science', label: 'Science Building' },
    { value: 'engineering', label: 'Engineering Block' },
    { value: 'arts', label: 'Arts & Humanities Centre' },
  ];

  useEffect(() => {
    // Load Razorpay script when component mounts
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleRazorpayPayment = () => {
    setLoading(true);

    // Mock order creation - in a real app, this would be an API call to your backend
    // where you would create an order with Razorpay and get an order_id
    setTimeout(() => {
      // Sample Razorpay options with dummy values
      const options = {
        key: 'rzp_test_YOUR_KEY_ID', // Replace with your actual test key in production
        amount: 350 * 100, // Amount in paisa (e.g., 350 INR = 35000 paisa)
        currency: 'INR',
        name: 'University Print Shop',
        description: 'Payment for print order',
        order_id: 'order_' + Date.now(), // This should come from your backend
        prefill: {
          email: '',
          contact: '',
        },
        theme: {
          color: '#3B82F6',
        },
        handler: function (response: any) {
          setLoading(false);
          toast.success(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
          onSubmit();
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            toast.error('Payment cancelled');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'upi') {
      handleRazorpayPayment();
      return;
    }
    
    setLoading(true);
    
    // Simulate payment processing for card and cash
    setTimeout(() => {
      setLoading(false);
      onSubmit();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-medium">Payment Method</h3>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:space-x-4">
          <Button
            type="button"
            variant={paymentMethod === 'card' ? 'default' : 'outline'}
            onClick={() => setPaymentMethod('card')}
            className={`flex-1 ${paymentMethod === 'card' ? 'bg-university-600 hover:bg-university-700' : ''}`}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Credit Card
          </Button>
          
          <Button
            type="button"
            variant={paymentMethod === 'upi' ? 'default' : 'outline'}
            onClick={() => setPaymentMethod('upi')}
            className={`flex-1 ${paymentMethod === 'upi' ? 'bg-university-600 hover:bg-university-700' : ''}`}
          >
            <IndianRupee className="mr-2 h-4 w-4" />
            UPI / Razorpay
          </Button>
          
          <Button
            type="button"
            variant={paymentMethod === 'cash' ? 'default' : 'outline'}
            onClick={() => setPaymentMethod('cash')}
            className={`flex-1 ${paymentMethod === 'cash' ? 'bg-university-600 hover:bg-university-700' : ''}`}
          >
            <Banknote className="mr-2 h-4 w-4" />
            Cash on Delivery
          </Button>
        </div>
      </div>

      {paymentMethod === 'card' ? (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardName">Name on Card</Label>
              <Input id="cardName" placeholder="John Smith" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  required
                  maxLength={19}
                  pattern="[0-9\s]{13,19}"
                />
                <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <div className="relative">
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    required
                    maxLength={5}
                    pattern="[0-9]{2}/[0-9]{2}"
                  />
                  <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  required
                  maxLength={4}
                  pattern="[0-9]{3,4}"
                  type="password"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : paymentMethod === 'upi' ? (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex flex-col items-center justify-center p-4">
              <IndianRupee className="h-16 w-16 text-blue-500 mb-4" />
              <h3 className="text-lg font-medium mb-2">UPI / Razorpay Payment</h3>
              <p className="text-sm text-gray-500 text-center mb-4">
                Click on 'Complete Payment' below to proceed with UPI payment via Razorpay's secure gateway.
              </p>
              <div className="flex gap-2 justify-center">
                <img src="https://cdn.razorpay.com/static/assets/logo/payment/upi.svg" alt="UPI" className="h-8" />
                <img src="https://cdn.razorpay.com/static/assets/logo/payment/gpay.svg" alt="Google Pay" className="h-8" />
                <img src="https://cdn.razorpay.com/static/assets/logo/payment/phonepe.svg" alt="PhonePe" className="h-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label>Payment Location</Label>
              <Select onValueChange={setPaymentLocation} value={paymentLocation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select location..." />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-2">
                You will pay when collecting your printouts.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="mt-6">
        <Button 
          type="submit" 
          className="w-full" 
          disabled={loading || (paymentMethod === 'cash' && !paymentLocation)}
        >
          {loading ? 'Processing...' : `Complete ${
            paymentMethod === 'card' ? 'Payment' : 
            paymentMethod === 'upi' ? 'UPI Payment' :
            'Order'
          }`}
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;
