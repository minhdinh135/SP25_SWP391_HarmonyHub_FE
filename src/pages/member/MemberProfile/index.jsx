import { useEffect, useState } from "react";
import { getMemberDetails, updateAccountAvatar } from "@/api/accountApi";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { getAccountStatusText } from "@/utils/enumUtils";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/layouts/DashboardLayout";
import useAuth from "@/hooks/useAuth";
import { formatBirthdate } from "@/utils/dateUtils";
import { ChevronRight, Edit, Mail, Phone } from "lucide-react";
import { useCallback } from "react";
import AvatarDialog from "./components/AvatarDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PersonalInfoDialog from "./components/PersonalInfoDialog";

const MemberProfile = () => {
  const { user, updateAvatar } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [memberDetails, setMemberDetails] = useState(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [isDropZoneOpen, setIsDropZoneOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getMemberDetails(user.accountId);
      console.log(data);
      setMemberDetails(data);
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
  };

  if (isLoading) return <Spinner />;

  return (
    <DashboardLayout role="member">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Profile Information</h1>
            <p className="text-gray-500">Manage your personal information</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4 mr-4">
            <Avatar
              className="w-32 h-32 hover:cursor-pointer hover:ring-2 hover:ring-blue-500"
              onClick={() => setIsDropZoneOpen(true)}
            >
              <AvatarImage
                src={
                  memberDetails?.avatarUrl ?? "https://github.com/shadcn.png"
                }
                alt={`${memberDetails?.firstName} ${memberDetails?.lastName}`}
              />
              <AvatarFallback className="text-2xl">
                {memberDetails?.firstName?.[0]}
                {memberDetails?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <Badge
              variant={memberDetails?.status === 1 ? "default" : "secondary"}
            >
              {getAccountStatusText(memberDetails?.status)}
            </Badge>
            {/* Contact Information */}
            <div className="w-full space-y-3 pt-4 border-t">
              <div className="grid grid-cols-[20px_1fr] gap-3 items-center">
                <Mail className="w-4 h-4 text-gray-500" />
                <p className="text-gray-700 break-all">
                  {memberDetails?.email}
                </p>
              </div>
              <div className="grid grid-cols-[20px_1fr] gap-3 items-center">
                <Phone className="w-4 h-4 text-gray-500" />
                <p className="text-gray-700">{memberDetails?.phone}</p>
              </div>
            </div>{" "}
          </div>
          {/* Personal Information Section */}
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
                  <p className="text-gray-700">{memberDetails?.firstName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Last Name</p>
                  <p className="text-gray-700">{memberDetails?.lastName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Birthdate</p>
                  <p className="text-gray-700">
                    {formatBirthdate(memberDetails?.birthdate)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="text-gray-700">
                    {memberDetails?.gender === 1
                      ? "Male"
                      : memberDetails?.gender === 2
                        ? "Female"
                        : "Prefer not to say"}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="space-y-1 mb-4">
                  <p className="text-sm text-gray-500">About Me</p>
                  <p className="text-gray-700">
                    {memberDetails?.bio || "Add information about yourself"}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Relationship Goals</p>
                  <p className="text-gray-700">
                    {memberDetails?.relationshipGoal ||
                      "Add your relationship goals"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>{" "}
        </div>

        <PersonalInfoDialog
          memberDetails={memberDetails}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          handleCancel={handleCancel}
        />

        <AvatarDialog
          onDrop={onDrop}
          preview={preview}
          handleCancel={handleCancel}
          handleSaveAvatar={handleSaveAvatar}
          isDropZoneOpen={isDropZoneOpen}
          setIsDropZoneOpen={setIsDropZoneOpen}
        />
      </div>
    </DashboardLayout>
  );
};

export default MemberProfile;
