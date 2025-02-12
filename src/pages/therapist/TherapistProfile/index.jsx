import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useToggleState from "@/hooks/useToggleState";
import { getTherapistDetails } from "@/api/accountApi";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { getStatusText } from "@/utils/enumUtils";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/layouts/DashboardLayout";

const MemberProfile = ({ userData }) => {
  const [isEditing, toggleIsEditing] = useToggleState(false);
  const [isLoading, toggleIsLoading] = useToggleState(false);
  const [therapistDetails, setTherapistDetails] = useState(null);
  const [formData, setFormData] = useState(userData);

  useEffect(() => {
    const fetchData = async () => {
      toggleIsLoading();
      try {
        const data = getTherapistDetails();
        setTherapistDetails(data);
      } catch (error) {
        console.log(error);
        toast.error("Error getting profile");
      } finally {
        toggleIsLoading();
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Updated data:", formData);
    toggleIsEditing();
  };

  if (isLoading) return <Spinner />;

  return (
    <DashboardLayout role="therapist">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your personal information
              </CardDescription>
            </div>
            <Button
              variant={isEditing ? "ghost" : "default"}
              onClick={() => (isEditing ? handleSubmit() : toggleIsEditing())}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-32 h-32">
                  <AvatarImage
                    src={
                      therapistDetails?.avatarUrl ??
                      "https://github.com/shadcn.png"
                    }
                    alt={`${therapistDetails?.firstName} ${therapistDetails?.lastName}`}
                  />
                  <AvatarFallback className="text-2xl">
                    {therapistDetails?.firstName?.[0]}
                    {therapistDetails?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <Badge
                  variant={
                    therapistDetails?.status === 1 ? "default" : "secondary"
                  }
                >
                  {getStatusText(therapistDetails?.status)}
                </Badge>
              </div>

              {/* Form Fields */}
              <div className="flex-1 grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birthdate">Birthdate</Label>
                    <Input
                      id="birthdate"
                      name="birthdate"
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      type="date"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      disabled={!isEditing}
                      onValueChange={(value) =>
                        handleInputChange({
                          target: { name: "gender", value: parseInt(value) },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Male</SelectItem>
                        <SelectItem value="2">Female</SelectItem>
                        <SelectItem value="3">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="relationshipGoal">Relationship Goal</Label>
                  <Textarea
                    id="relationshipGoal"
                    name="relationshipGoal"
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="What are your relationship goals?"
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself"
                    className="resize-none"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MemberProfile;
