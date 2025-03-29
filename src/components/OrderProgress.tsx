
import React from 'react';
import { Check } from 'lucide-react';

interface OrderProgressProps {
  currentStep: number;
}

const OrderProgress: React.FC<OrderProgressProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Upload' },
    { id: 2, name: 'Details' },
    { id: 3, name: 'Payment' },
    { id: 4, name: 'Confirmation' },
  ];

  return (
    <div className="w-full py-4">
      <div className="flex justify-between">
        {steps.map((step) => (
          <div 
            key={step.id} 
            className={`order-progress-step ${currentStep >= step.id ? 'order-progress-step-active' : ''} 
              ${currentStep > step.id ? 'completed' : ''}`}
          >
            <div className="relative z-10">
              <div 
                className={`step-number flex items-center justify-center h-8 w-8 rounded-full 
                  ${currentStep > step.id 
                    ? 'bg-university-600 text-white' 
                    : currentStep === step.id 
                      ? 'bg-university-500 text-white' 
                      : 'bg-gray-200 text-gray-500'}`}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.id
                )}
              </div>
            </div>
            <span 
              className={`mt-2 text-sm 
                ${currentStep >= step.id ? 'text-university-700 font-medium' : 'text-gray-500'}`}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderProgress;
