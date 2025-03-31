import { getTherapistDetails } from "@/api/accountApi";
import Spinner from "@/components/Spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils/dateUtils";
import { getAccountStatusText } from "@/utils/enumUtils";
import { Mail, Phone } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import QualificationSection from "./components/QualificationSection";
import AvailabilitySection from "./components/AvailabilitySection";

const TherapistProfileDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [therapistDetails, setTherapistDetails] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getTherapistDetails(id);
      setTherapistDetails(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (isLoading) return <Spinner />;
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Therapist Profile</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-32 h-32">
            <AvatarImage
              src={
                therapistDetails?.avatarUrl || "https://github.com/shadcn.png"
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
          </div>
        </div>

        <Card className="w-2/3">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Personal Information</CardTitle>
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
              <p className="text-sm text-gray-500">About Me</p>
              <p className="text-gray-700">{therapistDetails?.bio || "N/A"}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <QualificationSection therapistDetails={therapistDetails} />
      <AvailabilitySection therapistDetails={therapistDetails} />
    </div>
  );
};

export default TherapistProfileDetails;
