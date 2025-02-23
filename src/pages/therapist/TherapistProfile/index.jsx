import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import useAuth from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Mail, Phone, UploadCloud } from "lucide-react";
import { formatBirthdate } from "@/utils/dateUtils";

const MemberProfile = ({ userData }) => {
  const { user } = useAuth();

  const [isEditing, toggleIsEditing] = useToggleState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [therapistDetails, setTherapistDetails] = useState(null);
  const [formData, setFormData] = useState(userData);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [isDropZoneOpen, setIsDropZoneOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTherapistDetails(user.accountId);
        setTherapistDetails(data);
      } catch (error) {
        console.log(error);
        toast.error("Error getting profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user.accountId]);

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

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    setPreview(URL.createObjectURL(uploadedFile));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleSaveAvatar = () => {
    if (!file) return toast.error("Please select an image!");

    // Simulate API call
    setIsDropZoneOpen(false);
    toast.success("Avatar updated successfully!");
  };

  const handleCancel = () => {
    setIsDropZoneOpen(false);
    setPreview(null);
    setFile(null);
  };

  if (isLoading) return <Spinner />;

  return (
    <DashboardLayout role="therapist">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Profile Information</h1>
            <p className="text-gray-500">Manage your personal information</p>
          </div>
          <Button
            className="hover:bg-gray-600"
            variant={isEditing ? "outline" : "default"}
            onClick={() => (isEditing ? handleSubmit() : toggleIsEditing())}
          >
            {isEditing ? "Save Changes" : "Edit Information"}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar
              className="w-32 h-32 hover:cursor-pointer hover:ring-2 hover:ring-blue-500"
              onClick={() => setIsDropZoneOpen(true)}
            >
              <AvatarImage
                src={
                  therapistDetails?.avatarUrl ?? "https://github.com/shadcn.png"
                }
                alt={`${therapistDetails?.firstName} ${therapistDetails?.lastName}`}
              />
              <AvatarFallback className="text-2xl">
                {therapistDetails?.firstName?.[0]}
                {therapistDetails?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <Badge
              variant={therapistDetails?.status === 1 ? "default" : "secondary"}
            >
              {getStatusText(therapistDetails?.status)}
            </Badge>
            {/* Contact Information */}
            <div className="w-full space-y-3 pt-4 border-t">
              <div className="grid grid-cols-[20px_1fr] gap-3 items-center">
                <Mail className="w-4 h-4 text-gray-500" />
                <p className="text-gray-700 break-all">
                  {therapistDetails?.email}
                </p>
              </div>
              <div className="grid grid-cols-[20px_1fr] gap-3 items-center">
                <Phone className="w-4 h-4 text-gray-500" />
                <p className="text-gray-700">{therapistDetails?.phone}</p>
              </div>
            </div>{" "}
          </div>

          {/* Profile Information */}
          <div className="flex-1 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">First Name</Label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={therapistDetails?.firstName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                ) : (
                  <p className="text-gray-700">{therapistDetails?.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Last Name</Label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={therapistDetails?.lastName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                ) : (
                  <p className="text-gray-700">{therapistDetails?.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Birthdate</Label>
                {isEditing ? (
                  <input
                    type="date"
                    name="birthdate"
                    value={formatBirthdate(therapistDetails?.birthdate)}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                ) : (
                  <p className="text-gray-700">
                    {formatBirthdate(therapistDetails?.birthdate)}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Gender</Label>
                {isEditing ? (
                  <Select
                    value={therapistDetails?.gender.toString()}
                    onValueChange={handleInputChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Male</SelectItem>
                      <SelectItem value="2">Female</SelectItem>
                      <SelectItem value="0">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-gray-700">
                    {therapistDetails?.gender === 1
                      ? "Male"
                      : therapistDetails?.gender === 2
                        ? "Female"
                        : "Prefer not to say"}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Bio</Label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={therapistDetails?.bio}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md resize-none h-24"
                  placeholder="Tell us about yourself"
                />
              ) : (
                <p className="text-gray-700">
                  {therapistDetails?.bio ?? "N/A"}
                </p>
              )}
            </div>
          </div>
        </div>

        <Dialog open={isDropZoneOpen} onOpenChange={setIsDropZoneOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Profile Picture</DialogTitle>
            </DialogHeader>

            {/* Dropzone Area */}
            <div
              {...getRootProps()}
              className="border-2 border-dashed p-6 text-center cursor-pointer"
            >
              <input {...getInputProps()} />
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-40 object-cover mx-auto rounded-full"
                />
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <UploadCloud className="h-10 w-10 text-gray-500" />
                  <p className="text-gray-500">
                    Drag & drop or click to upload
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <DialogFooter>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSaveAvatar}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default MemberProfile;
