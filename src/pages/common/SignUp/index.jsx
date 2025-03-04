import React, { useState } from 'react';
import Stepper from "@/components/Stepper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast } from 'sonner'; // Assuming you're using sonner for notifications

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '123456789', // Default placeholder, can be modified
    relationshipGoal: 'Marry', // Default placeholder, can be modified
    birthdate: '2003-03-04', // Default placeholder, can be modified
    gender: 1, // Default placeholder, can be modified
    bio: 'Looking for a partner', // Default placeholder, can be modified
    avatarUrl: '' // Optional, can be added later
  });

  const steps = ["Role Selection", "Basic Information", "Review"];

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setCurrentStep(2);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Prepare registration payload
    const payload = {
      avatarUrl: formData.avatarUrl || '',
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      relationshipGoal: formData.relationshipGoal,
      firstName: formData.firstName,
      lastName: formData.lastName,
      birthdate: formData.birthdate,
      gender: formData.gender,
      bio: formData.bio
    };

    try {
      const url = selectedRole === 'Member'
        ? 'https://harmony-backend.runasp.net/api/register/member'
        : 'https://harmony-backend.runasp.net/api/register/therapist';

      const response = await axios.post(url, payload);

      toast.success('Registration Successful!');
      // Handle successful registration (e.g., redirect to login)
    } catch (error) {
      console.error('Registration Error:', error);
      toast.error(error.response?.data?.message || 'Registration Failed');
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col md:flex-row bg-gray-50">
      <div className="w-full md:w-1/3 bg-gray-900 text-white p-8 flex flex-col justify-center items-center">
        <div className="max-w-md space-y-6">
          <img
            src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=2080&auto=format&fit=crop"
            alt="Decorative workspace"
            className="rounded-lg shadow-xl w-full object-cover aspect-video"
          />
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-gray-400">
              Join our session and start your journey with us today.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/3 flex items-center justify-center p-8">
        <Stepper steps={steps} initialStep={currentStep} onStepChange={setCurrentStep}>
          {currentStep === 1 && (
            <div className="w-full flex flex-col items-center space-y-4">
              <h1 className="text-2xl">Choose Role</h1>
              <Button
                onClick={() => handleRoleSelection('Member')}
                className="w-full max-w-md"
              >
                Member
              </Button>
              <Button
                onClick={() => handleRoleSelection('Therapist')}
                className="w-full max-w-md"
              >
                Therapist
              </Button>
            </div>
          )}
          {currentStep === 2 && (
            <Card className="w-full max-w-md">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">
                  Sign Up as {selectedRole}
                </CardTitle>
                <CardDescription className="text-center">
                  Enter your details to create your account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                  <p className="text-sm text-gray-500 text-center">
                    Already have an account?{" "}
                    <Link
                      to="/"
                      className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                      Sign in
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          )}
        </Stepper>
      </div>
    </main>
  );
};

export default SignUp;
