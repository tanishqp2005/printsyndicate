
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CreditCard, QrCode, Banknote } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PaymentFormProps {
  onSubmit: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cash'>('upi');
  const [loading, setLoading] = useState(false);
  const [paymentLocation, setPaymentLocation] = useState("");

  const locations = [
    { value: 'library', label: 'University Library' },
    { value: 'union', label: 'Student Union' },
    { value: 'science', label: 'Science Building' },
    { value: 'engineering', label: 'Engineering Block' },
    { value: 'arts', label: 'Arts & Humanities Centre' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    
    // Simulate payment processing for UPI and cash
    setTimeout(() => {
      setLoading(false);
      toast.success(`${paymentMethod === 'upi' ? 'UPI Payment' : 'Cash on Delivery'} completed successfully!`);
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
            variant={paymentMethod === 'upi' ? 'default' : 'outline'}
            onClick={() => setPaymentMethod('upi')}
            className={`flex-1 ${paymentMethod === 'upi' ? 'bg-university-600 hover:bg-university-700' : ''}`}
          >
            <QrCode className="mr-2 h-4 w-4" />
            UPI
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

      {paymentMethod === 'upi' ? (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label>UPI ID</Label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Enter UPI ID" 
                  className="w-full px-3 py-2 border rounded-md"
                  required 
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Your UPI ID will be used to process the payment.
              </p>
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
            paymentMethod === 'upi' ? 'UPI Payment' : 'Cash on Delivery'
          }`}
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;

