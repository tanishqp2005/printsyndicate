
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, File, Clock, CheckCircle, AlertTriangle, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Sample order data
const orders = [
  {
    id: 'PS892345',
    date: '2023-10-15',
    file: 'Assignment-Final.pdf',
    status: 'completed',
    amount: '$4.50',
    delivery: 'Science Building, Room 302',
  },
  {
    id: 'PS892346',
    date: '2023-10-18',
    file: 'Research-Paper.pdf',
    status: 'processing',
    amount: '$7.20',
    delivery: 'Library, Room 101',
  },
  {
    id: 'PS892347',
    date: '2023-10-20',
    file: 'Group-Presentation.pdf',
    status: 'pending',
    amount: '$12.75',
    delivery: 'Engineering Block, Room 205',
  },
];

// Status badge mapper
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      );
    case 'processing':
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          <Clock className="h-3 w-3 mr-1" />
          Processing
        </Badge>
      );
    case 'pending':
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      );
    default:
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
          Unknown
        </Badge>
      );
  }
};

const OrdersPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Orders</h1>
            <Link to="/order">
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                New Print Order
              </Button>
            </Link>
          </div>
          
          {orders.length > 0 ? (
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <Table>
                <TableCaption>List of your recent print orders</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>File</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Delivery</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <File className="h-4 w-4 text-gray-500" />
                          <span className="truncate max-w-[150px]">{order.file}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell className="truncate max-w-[200px]">{order.delivery}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
              <p className="text-gray-600 mb-6">
                You haven't placed any print orders yet. 
                Start by creating your first print order.
              </p>
              <Link to="/order">
                <Button>
                  Create Print Order
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrdersPage;
