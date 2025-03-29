
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface OrderConfirmationProps {
  orderNumber: string;
  orderDate: Date;
  estimatedDelivery: Date;
  location: string;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  orderNumber,
  orderDate,
  estimatedDelivery,
  location,
}) => {
  return (
    <div className="max-w-md mx-auto text-center">
      <div className="mb-6">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
        <p className="text-gray-600">
          Your print request has been submitted successfully.
        </p>
      </div>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Order Number</p>
              <p className="font-medium">{orderNumber}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-500">Order Date</p>
                </div>
                <p className="text-sm">
                  {orderDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-500">Estimated Delivery</p>
                </div>
                <p className="text-sm">
                  {estimatedDelivery.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <p className="text-sm text-gray-500">Delivery Location</p>
              </div>
              <p className="text-sm">{location}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <p className="text-sm text-gray-600 mb-6">
        We have sent a confirmation email with your order details.
        You will receive a notification when your printout is ready.
      </p>
      
      <div className="space-y-4">
        <Link to="/">
          <Button variant="default" className="w-full">
            Back to Home
          </Button>
        </Link>
        
        <Link to="/orders">
          <Button variant="outline" className="w-full">
            View My Orders
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
