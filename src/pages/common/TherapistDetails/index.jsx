import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Mail, Phone } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTherapistDetails } from "@/api/accountApi";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";
import { formatTime } from "@/utils/timeUtils";

const TherapistDetails = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [therapistDetails, setTherapistDetails] = useState(null);

  useEffect(() => {
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

    fetchData();
  }, [id]);

  if (isLoading) return <Spinner />;

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-4xl bg-white">
        <div className="p-6">
          <div className="flex gap-6 items-center">
            <Avatar className="h-36 w-36">
              <AvatarImage src={therapistDetails?.avatarUrl} alt="Therapist" />
              <AvatarFallback>EH</AvatarFallback>
            </Avatar>

            <div className="flex flex-col justify-between flex-grow">
              <div>
                <h1 className="text-2xl font-semibold">Dr. Emily Harper</h1>
                <p className="text-muted-foreground">Pre-marital Counselor</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {therapistDetails?.yearsOfExperience} years experience
                </p>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-bold">4.9</span>
                <span className="text-sm text-muted-foreground">
                  (9999 reviews)
                </span>
                <Badge variant="success" className="ml-2">
                  Available
                </Badge>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <Link to="/bookappointment">
                <Button className="w-36">Book Appointment</Button>
              </Link>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">About me</h2>

              <p className="text-sm text-muted-foreground">
                {therapistDetails?.bio ?? "N/A"}
              </p>

              <div className="flex flex-col">
                <h3 className="text-sm font-semibold">I can help you with:</h3>
                <div className="flex gap-2 mt-3">
                  {therapistDetails?.qualifications.map((q, index) => (
                    <Badge key={index} variant="secondary">
                      {q.specialty.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Service Packages</h2>
              <div className="space-y-4">
                {therapistDetails?.packages.map((pkg, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-muted rounded-lg"
                  >
                    <div>
                      <h3 className="font-bold">{pkg.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {pkg.description}
                      </p>
                    </div>
                    <span className="text-primary font-bold">
                      {pkg.minutesPerAppointment} minutes - {pkg.price} VND
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Availability</h2>

              <div className="grid grid-cols-7 gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, index) => {
                    const availability = therapistDetails?.availabilities?.find(
                      (slot) => slot.dayOfWeek === index + 1,
                    );

                    return (
                      <div
                        key={index}
                        className={`p-4 text-center rounded-lg ${
                          availability
                            ? "bg-primary text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <span className="block text-sm font-semibold">
                          {day}
                        </span>
                        <span className="block text-xs mt-1">
                          {availability
                            ? `${formatTime(availability.fromTime)} - ${formatTime(availability.toTime)}`
                            : "Unavailable"}
                        </span>
                      </div>
                    );
                  },
                )}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">
                Contact Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {therapistDetails?.email}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
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
