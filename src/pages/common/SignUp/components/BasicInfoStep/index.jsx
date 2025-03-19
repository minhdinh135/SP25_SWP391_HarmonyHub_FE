import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CalendarIcon,
  FileTextIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";

const BasicInfoStep = ({
  selectedRole,
  formData,
  handleInputChange,
  handleSubmit,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="space-y-5 py-4">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="w-full md:w-1/2 space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <div className="relative">
            <UserIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
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
        <div className="w-full md:w-1/2 space-y-2 mt-4 md:mt-0">
          <Label htmlFor="lastName">Last Name</Label>
          <div className="relative">
            <UserIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
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
          <MailIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
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
          <LockIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Create a strong password"
            className="pl-10 pr-10"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2E5077]"
          >
            {isPasswordVisible ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <LockIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            id="confirmPassword"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Confirm your password"
            className="pl-10"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="w-full md:w-1/2 space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Input
              id="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 space-y-2 mt-4 md:mt-0">
          <Label htmlFor="birthdate">Birthdate</Label>
          <div className="relative">
            <CalendarIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              id="birthdate"
              type="date"
              className="pl-10"
              value={formData.birthdate}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="w-full md:w-1/2 space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <div className="relative">
            <select
              id="gender"
              className="w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value={1}>Male</option>
              <option value={2}>Female</option>
              <option value={3}>Other</option>
            </select>
          </div>
        </div>
        <div className="w-full md:w-1/2 space-y-2 mt-4 md:mt-0">
          <Label htmlFor="relationshipGoal">Relationship Goal</Label>
          <div className="relative">
            <select
              id="relationshipGoal"
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              value={formData.relationshipGoal}
              onChange={handleInputChange}
            >
              <option value="Marry">Marriage</option>
              <option value="Date">Dating</option>
              <option value="Friend">Friendship</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <div className="relative">
          <FileTextIcon
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />
          <textarea
            id="bio"
            className="w-full min-h-24 pl-10 rounded-md border border-input bg-background px-3 py-2"
            placeholder="Tell us about yourself"
            value={formData.bio}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {selectedRole === "Member" && (
        <div className="pt-4">
          <Button
            onClick={handleSubmit}
            className="w-full bg-[#2E5077] hover:bg-[#4DA1A9] transition-colors duration-300"
          >
            Register account
          </Button>
        </div>
      )}
    </div>
  );
};

export default BasicInfoStep;
