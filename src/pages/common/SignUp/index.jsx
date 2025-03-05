import React, { useState } from 'react';
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
import { toast } from 'sonner';
import {
  UserIcon,
  MailIcon,
  LockIcon,
  Users2Icon,
  StethoscopeIcon
} from 'lucide-react';

const SignUp = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '123456789',
    relationshipGoal: 'Marry',
    birthdate: '2003-03-04',
    gender: 1,
    bio: 'Looking for a partner',
    avatarUrl: ''
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
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

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

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
    } catch (error) {
      console.error('Registration Error:', error);
      toast.error(error.response?.data?.message || 'Registration Failed');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-[#F6F4F0] via-[#F0F4F6] to-[#F4F0F6] relative overflow-hidden">
      {/* Decorative Blurred Circles */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#79D7BE]/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#2E5077]/20 rounded-full blur-3xl"></div>

      {/* Left Side - Welcome Section */}
      <div className="w-full md:w-1/3 bg-[#2E5077] text-white p-8 flex flex-col justify-center items-center relative z-10">
        <div className="max-w-md space-y-6">
          <div className="relative">
            <img
              src="https://damonashworthpsychology.com/wp-content/uploads/2021/12/250f2-pexels-photo-4101143.jpeg?w=1568"
              alt="Decorative workspace"
              className="rounded-lg shadow-xl w-full object-cover aspect-video transform transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#2E5077]/30 rounded-lg"></div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Create an Account</h1>
            <p className="text-gray-300">
              Join our community and start your personal growth journey today.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full md:w-2/3 flex items-center justify-center px-10 relative z-10">
        {!selectedRole ? (
          <div className="w-full flex flex-col items-center space-y-4">
            <h1 className="text-2xl font-semibold text-[#2E5077]">Choose Your Role</h1>
            <div className="flex space-x-4">
              <Button
                onClick={() => handleRoleSelection('Member')}
                className="w-40 bg-[#2E5077] text-white hover:bg-[#4DA1A9] transition-all duration-300 group"
              >
                <Users2Icon className="mr-2 group-hover:rotate-12 transition-transform" />
                Member
              </Button>
              <Button
                onClick={() => handleRoleSelection('Therapist')}
                className="w-40 bg-[#79D7BE] text-[#2E5077] hover:bg-[#2E5077] hover:text-white transition-all duration-300 group"
              >
                <StethoscopeIcon className="mr-2 group-hover:rotate-12 transition-transform" />
                Therapist
              </Button>
            </div>
          </div>
        ) : (
          <Card className="w-full max-w-md shadow-2xl border-none">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-[#2E5077]">
                Sign Up as {selectedRole}
              </CardTitle>
              <CardDescription>
                Enter your details to create your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="flex space-x-4">
                  <div className="w-1/2 space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        className="pl-10"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="w-1/2 space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        className="pl-10"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter Email"
                      className="pl-10"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      id="password"
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Enter Password"
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2E5077]"
                    >
                      {passwordVisible ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      id="confirmPassword"
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Confirm password"
                      className="pl-10"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-[#2E5077] hover:bg-[#4DA1A9] transition-colors duration-300"
                >
                  Create Account
                </Button>
                <p className="text-sm text-gray-500 text-center">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-[#79D7BE] hover:text-[#2E5077] font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SignUp;
