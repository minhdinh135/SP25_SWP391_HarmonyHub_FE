import { useEffect, useState } from "react";
import { getTherapistDetails, updateAccountAvatar } from "@/api/accountApi";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { getAccountStatusText } from "@/utils/enumUtils";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/layouts/DashboardLayout";
import useAuth from "@/hooks/useAuth";
import { useCallback } from "react";
import { ChevronRight, Edit, Mail, Phone } from "lucide-react";
import { formatDate } from "@/utils/dateUtils";
import QualificationSection from "./components/QualificationSection";
import AvailabilitySection from "./components/AvailabilitySection";
import AvatarDialog from "@/pages/member/MemberProfile/components/AvatarDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PersonalInfoDialog from "./components/PersonalInfoDialog";

const TherapistProfile = () => {
  const { user, updateAvatar } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [therapistDetails, setTherapistDetails] = useState(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [isDropZoneOpen, setIsDropZoneOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getTherapistDetails(user.accountId);
      setTherapistDetails(data);
    } catch (error) {
      console.log(error);
      toast.error("Error getting profile");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user.accountId]);

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    setPreview(URL.createObjectURL(uploadedFile));
  }, []);

  const handleSaveAvatar = async () => {
    if (!file) return toast.error("Please select an image!");

    try {
      setIsLoading(true);
      const data = await updateAccountAvatar(user.accountId, file);
      fetchData();
      updateAvatar(data.avatarUrl);
      toast.success("Avatar updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
      setIsDropZoneOpen(false);
    }
  };

  const handleCancel = () => {
    setIsDropZoneOpen(false);
    setPreview(null);
    setFile(null);
    setIsDialogOpen(false);
  };

  if (isLoading) return <Spinner />;

  return (
    <DashboardLayout role="therapist">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-bold">Personal Information</h1>
          </div>
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
              {getAccountStatusText(therapistDetails?.status)}
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
          <Card
            className="w-2/3 hover:bg-gray-50 transition-colors cursor-pointer group"
            onClick={() => setIsDialogOpen(true)}
          >
            <CardHeader className="pb-2 flex flex-row justify-between items-center">
              <CardTitle className="text-lg">My Information</CardTitle>
              <div className="text-gray-400 group-hover:text-gray-600">
                <Edit className="h-4 w-4 mr-1 inline-block" />
                <ChevronRight className="h-4 w-4 inline-block" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">First Name</p>
                  <p className="text-gray-700">{therapistDetails?.firstName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Last Name</p>
                  <p className="text-gray-700">{therapistDetails?.lastName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Birthdate</p>
                  <p className="text-gray-700">
                    {formatDate(therapistDetails?.birthdate)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="text-gray-700">
                    {therapistDetails?.gender === 1
                      ? "Male"
                      : therapistDetails?.gender === 2
                        ? "Female"
                        : "Prefer not to say"}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="text-gray-700">
                    {therapistDetails?.yearsOfExperience} years
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="space-y-1 mb-4">
                  <p className="text-sm text-gray-500">About Me</p>
                  <p className="text-gray-700">
                    {therapistDetails?.bio || "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>{" "}
        </div>

        {/* Qualifications */}
        <QualificationSection therapistDetails={therapistDetails} />

        {/* Availability */}
        <AvailabilitySection therapistDetails={therapistDetails} />

        <AvatarDialog
          onDrop={onDrop}
          preview={preview}
          handleCancel={handleCancel}
          handleSaveAvatar={handleSaveAvatar}
          isDropZoneOpen={isDropZoneOpen}
          setIsDropZoneOpen={setIsDropZoneOpen}
        />

        <PersonalInfoDialog
          therapistDetails={therapistDetails}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          handleCancel={handleCancel}
        />
      </div>
    </DashboardLayout>
  );
};

export default TherapistProfile;
