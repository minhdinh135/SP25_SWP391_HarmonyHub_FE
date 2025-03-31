import { getMemberDetails } from "@/api/accountApi";
import Spinner from "@/components/Spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils/dateUtils";
import { getAccountStatusText } from "@/utils/enumUtils";
import { Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const MemberProfileDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [memberDetails, setMemberDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMemberDetails(id);
        setMemberDetails(data);
      } catch (error) {
        console.error("Error getting profile", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <Spinner />;
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Profile Information</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center space-y-4 mr-4">
          <Avatar className="w-32 h-32">
            <AvatarImage
              src={memberDetails?.avatarUrl || "https://github.com/shadcn.png"}
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
              <p className="text-gray-700 break-all">{memberDetails?.email}</p>
            </div>
            <div className="grid grid-cols-[20px_1fr] gap-3 items-center">
              <Phone className="w-4 h-4 text-gray-500" />
              <p className="text-gray-700">{memberDetails?.phone}</p>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <Card className="w-2/3">
          <CardHeader>
            <CardTitle className="text-lg">My Information</CardTitle>
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
                  {formatDate(memberDetails?.birthdate)}
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
                <p className="text-gray-700">{memberDetails?.bio || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Relationship Goal</p>
                <p className="text-gray-700">
                  {memberDetails?.relationshipGoal || "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemberProfileDetails;
