import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Mail, Phone, UserCheck } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTherapistDetails } from "@/api/accountApi";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";
import { hasPermission } from "@/constants/permission";
import { getRoleKey } from "@/constants/role";
import useAuth from "@/hooks/useAuth";
import { getGenderText } from "@/utils/enumUtils";
import { getFullName } from "@/utils/nameFormat";
import TherapistAvailability from "./components/TherapistAvailability";
import { getTherapistAppointments } from "@/api/appointmentApi";

const TherapistDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [therapistDetails, setTherapistDetails] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getTherapistDetails(id);
      setTherapistDetails(data);
    } catch (error) {
      console.log(error);
      toast.error("Error getting profile");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTherapistAppointments = async () => {
    try {
      const data = await getTherapistAppointments(id);
      setAppointments(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTherapistAppointments();
  }, [id]);

  const reviewedAppointments = appointments.filter(
    (appointment) => appointment.feedbackRating !== null,
  );

  // Count of reviews
  const reviewCount = reviewedAppointments.length;

  // Calculate average rating
  const totalRating = reviewedAppointments.reduce(
    (sum, app) => sum + app.feedbackRating,
    0,
  );

  const averageRating =
    reviewCount > 0 ? (totalRating / reviewCount).toFixed(1) : 0;

  const handleClickBookAppointment = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    navigate(`/therapists/${id}/appointment-booking`);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-4xl bg-white">
        <div className="p-6">
          <div className="flex gap-6 items-center relative">
            <Avatar className="h-36 w-36 ring-4 ring-blue-50 hover:ring-blue-100 transition-all">
              <AvatarImage src={therapistDetails?.avatarUrl} alt="Therapist" />
              <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                EH
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col justify-between flex-grow">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {getFullName(
                      therapistDetails?.firstName,
                      therapistDetails?.lastName,
                    )}
                  </h1>
                  <UserCheck className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-blue-600 font-medium">
                  Pre-marital Counselor
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {getGenderText(therapistDetails?.gender)}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {therapistDetails?.yearsOfExperience} years experience
                </p>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-bold text-yellow-600">
                    {averageRating || 0.0}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ({reviewCount || 0} reviews)
                </span>
              </div>
            </div>

            {(!user ||
              hasPermission(getRoleKey(user?.role), "create:appointment")) && (
              <div className="absolute top-0 right-0">
                <Button
                  className="w-40 bg-blue-600 hover:bg-blue-700 transition-colors"
                  onClick={handleClickBookAppointment}
                >
                  Book Appointment
                </Button>
              </div>
            )}
          </div>

          <Separator className="my-6 bg-gray-200" />

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                About me
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed">
                {therapistDetails?.bio ?? "N/A"}
              </p>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  I can help you with:
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {therapistDetails?.qualifications.map((q, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-50 text-blue-700 px-3 py-1"
                    >
                      {q.specialty.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Service Packages
              </h2>
              <div className="space-y-4">
                {therapistDetails?.packages.map((pkg, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <div>
                      <h3 className="font-bold text-gray-800">{pkg.name}</h3>
                      <p className="text-sm text-gray-600">{pkg.description}</p>
                    </div>
                    <span className="text-blue-600 font-bold">
                      {pkg.minutesPerAppointment} minutes - {pkg.price} VND
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Availability
              </h2>

              {/* <div className="grid grid-cols-7 gap-2"> */}
              {/*   {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map( */}
              {/*     (day, index) => { */}
              {/*       const availability = therapistDetails?.availabilities?.find( */}
              {/*         (slot) => slot.dayOfWeek === index + 1, */}
              {/*       ); */}
              {/**/}
              {/*       return ( */}
              {/*         <div */}
              {/*           key={index} */}
              {/*           className={`p-4 text-center rounded-lg transition-all ${ */}
              {/*             availability */}
              {/*               ? "bg-blue-600 text-white hover:bg-blue-700" */}
              {/*               : "bg-gray-200 text-gray-500 opacity-50" */}
              {/*           }`} */}
              {/*         > */}
              {/*           <span className="block text-sm font-semibold"> */}
              {/*             {day} */}
              {/*           </span> */}
              {/*           <span className="block text-xs mt-1"> */}
              {/*             {availability */}
              {/*               ? `${formatTime(availability.fromTime)} - ${formatTime(availability.toTime)}` */}
              {/*               : "Unavailable"} */}
              {/*           </span> */}
              {/*         </div> */}
              {/*       ); */}
              {/*     }, */}
              {/*   )} */}
              {/* </div> */}
            </div>

            {/* New Availability Component */}
            <TherapistAvailability therapistDetails={therapistDetails} />

            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Contact Information
              </h2>
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">
                    {therapistDetails?.email}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">
                    {therapistDetails?.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistDetails;
