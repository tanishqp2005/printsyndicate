
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().min(2, { message: 'Subject is required' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const contactInfo = [
  {
    icon: <Mail className="h-5 w-5 text-university-600" />,
    title: 'Email',
    details: 'print@university.edu',
    action: 'mailto:print@university.edu',
  },
  {
    icon: <Phone className="h-5 w-5 text-university-600" />,
    title: 'Phone',
    details: '+1 (555) 123-4567',
    action: 'tel:+15551234567',
  },
  {
    icon: <MapPin className="h-5 w-5 text-university-600" />,
    title: 'Location',
    details: 'Student Union Building, University Campus',
    action: '#',
  },
  {
    icon: <Clock className="h-5 w-5 text-university-600" />,
    title: 'Business Hours',
    details: 'Monday - Friday: 8AM - 6PM',
    action: '#',
  },
];

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Contact form submitted:', data);
      toast.success('Your message has been sent successfully!');
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions about our printing service? We're here to help.
              Reach out to us using the contact form or the information below.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <div className="bg-white rounded-lg shadow-sm p-6 border mb-8">
                  <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    {contactInfo.map((item, index) => (
                      <a
                        key={index}
                        href={item.action}
                        className="flex items-start gap-4 hover:bg-gray-50 p-3 rounded-md transition-colors"
                      >
                        <div className="p-2 bg-university-100 rounded-full">{item.icon}</div>
                        <div>
                          <h3 className="font-medium text-gray-900">{item.title}</h3>
                          <p className="text-gray-600">{item.details}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6 border">
                  <h2 className="text-xl font-semibold mb-4">Campus Map</h2>
                  <div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50000!1m3!1d3000!2m3!1f0!2m1!1f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDAyJzI4LjQiTiA5NMKwMDUnMTkuOCJF!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    We are located in the Student Union Building, main floor, Room 101.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <h2 className="text-xl font-semibold mb-6">Send Us a Message</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="What is your message about?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="How can we help you?"
                              className="resize-y min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
