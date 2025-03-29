
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Printer, Copy, Palette, Layers, FileText, BookOpen } from 'lucide-react';

interface PrintOptions {
  copies: string;
  color: 'bw' | 'color';
  doubleSided: 'single' | 'double';
  pageSize: 'a4' | 'a3' | 'letter';
  binding: 'none' | 'staple' | 'spiral';
}

interface OrderSummaryProps {
  fileName: string;
  fileSize: number;
  pageCount?: number;
  printOptions: PrintOptions;
  totalPrice: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  fileName, 
  fileSize, 
  pageCount = 0, 
  printOptions, 
  totalPrice 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Document Details</h4>
          <div className="space-y-2">
            <div className="flex items-start">
              <FileText className="h-5 w-5 text-university-600 mr-3" />
              <div>
                <p className="text-sm font-medium line-clamp-1">{fileName}</p>
                <p className="text-xs text-gray-500">
                  {(fileSize / 1024 / 1024).toFixed(2)} MB
                  {pageCount > 0 && ` • ${pageCount} pages`}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Print Options</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center">
              <Copy className="h-4 w-4 text-university-600 mr-2" />
              <span className="text-sm">
                {printOptions.copies} {parseInt(printOptions.copies) > 1 ? 'copies' : 'copy'}
              </span>
            </div>
            
            <div className="flex items-center">
              <Palette className="h-4 w-4 text-university-600 mr-2" />
              <span className="text-sm">
                {printOptions.color === 'bw' ? 'Black & White' : 'Color'}
              </span>
            </div>
            
            <div className="flex items-center">
              <Layers className="h-4 w-4 text-university-600 mr-2" />
              <span className="text-sm">
                {printOptions.doubleSided === 'single' ? 'Single-sided' : 'Double-sided'}
              </span>
            </div>
            
            <div className="flex items-center">
              <Printer className="h-4 w-4 text-university-600 mr-2" />
              <span className="text-sm">
                {printOptions.pageSize.toUpperCase()} {printOptions.pageSize === 'letter' ? 'Size' : ''}
              </span>
            </div>
            
            {printOptions.binding !== 'none' && (
              <div className="flex items-center col-span-2">
                <BookOpen className="h-4 w-4 text-university-600 mr-2" />
                <span className="text-sm">
                  {printOptions.binding === 'staple' ? 'Stapled' : 'Spiral Binding'}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Base Price</span>
            <span className="text-sm">$3.50</span>
          </div>
          
          {printOptions.color === 'color' && (
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Color Printing</span>
              <span className="text-sm">$2.00</span>
            </div>
          )}
          
          {printOptions.binding !== 'none' && (
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                {printOptions.binding === 'staple' ? 'Stapling' : 'Spiral Binding'}
              </span>
              <span className="text-sm">
                ${printOptions.binding === 'staple' ? '0.50' : '3.00'}
              </span>
            </div>
          )}
          
          {parseInt(printOptions.copies) > 1 && (
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                Additional Copies (×{parseInt(printOptions.copies) - 1})
              </span>
              <span className="text-sm">
                ${((parseInt(printOptions.copies) - 1) * 3.50).toFixed(2)}
              </span>
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total</span>
            <span className="font-medium text-university-700">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
