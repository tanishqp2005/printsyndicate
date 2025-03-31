
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Mail, Loader2, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Email form schema
const emailFormSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email')
    .refine((email) => email.endsWith('@sakec.ac.in'), {
      message: 'Only @sakec.ac.in email addresses are allowed',
    }),
});

// OTP form schema
const otpFormSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

type EmailFormValues = z.infer<typeof emailFormSchema>;
type OTPFormValues = z.infer<typeof otpFormSchema>;

const SignInPage = () => {
  const { requestOTP, verifyOTP } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailVerificationStep, setEmailVerificationStep] = useState(true);
  const [email, setEmail] = useState('');

  // Email form
  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: '',
    },
  });

  // OTP form
  const otpForm = useForm<OTPFormValues>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: '',
    },
  });

  const onEmailSubmit = async (data: EmailFormValues) => {
    setIsSubmitting(true);
    const success = await requestOTP(data.email);
    setIsSubmitting(false);
    
    if (success) {
      setEmail(data.email);
      setEmailVerificationStep(false);
    }
  };

  const onOTPSubmit = async (data: OTPFormValues) => {
    setIsSubmitting(true);
    const success = await verifyOTP(email, data.otp);
    setIsSubmitting(false);
    
    if (success) {
      navigate('/');
    }
  };

  const handleResendOTP = async () => {
    setIsSubmitting(true);
    await requestOTP(email);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              {emailVerificationStep ? 'Sign in to your account' : 'Enter verification code'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {emailVerificationStep 
                ? 'We\'ll send a code to your student email' 
                : `We've sent a 6-digit code to ${email}`}
            </p>
          </div>
          
          {emailVerificationStep ? (
            // Email Form
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your.name@sakec.ac.in" 
                          {...field} 
                          autoComplete="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending code...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Continue with Email
                    </>
                  )}
                </Button>
              </form>
            </Form>
          ) : (
            // OTP Verification Form
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(onOTPSubmit)} className="space-y-6">
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Code</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="text-university-600 hover:text-university-700 text-sm"
                    disabled={isSubmitting}
                  >
                    Resend code
                  </button>
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Verify and Sign In
                    </>
                  )}
                </Button>
                
                <button
                  type="button"
                  onClick={() => setEmailVerificationStep(true)}
                  className="text-university-600 hover:text-university-700 text-sm w-full"
                >
                  Use a different email
                </button>
              </form>
            </Form>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignInPage;
