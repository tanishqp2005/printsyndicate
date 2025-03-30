
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CreditCard, Calendar, Banknote } from 'lucide-react';
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
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
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
    
    // Simulate payment processing for card and cash
    setTimeout(() => {
      setLoading(false);
      toast.success(`${paymentMethod === 'card' ? 'Payment' : 'Order'} completed successfully!`);
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
            paymentMethod === 'card' ? 'Payment' : 'Order'
          }`}
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;
