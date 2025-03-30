
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserRound, Mail, Phone, School } from 'lucide-react';

const ProfilePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">My Profile</h1>
            
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserRound className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>Manage your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500">Full Name</label>
                      <p className="font-medium">John Doe</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Student ID</label>
                      <p className="font-medium">STU2023456</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <p>johndoe@university.edu</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <p>+1 (555) 123-4567</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <School className="h-4 w-4 text-gray-500" />
                      <p>Computer Science</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="mt-4">Edit Profile</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Manage your printing preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-500">Default Print Mode</label>
                      <p className="font-medium">Black & White</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Default Paper Size</label>
                      <p className="font-medium">A4</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Default Binding</label>
                      <p className="font-medium">None</p>
                    </div>
                    <Button variant="outline">Update Preferences</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline">Change Password</Button>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
