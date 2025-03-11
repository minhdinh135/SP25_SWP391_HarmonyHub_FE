import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Spinner from "@/components/Spinner";
import { getTherapistDetails } from "@/api/accountApi";
import { createAppointment } from "@/api/appointmentApi";
import useAuth from "@/hooks/useAuth";
import { Calendar, Check, Clock, MessageSquare, Package } from "lucide-react";
import { calculateEndTime, formatTimeString } from "@/utils/timeUtils";

const BookAppointmentForm = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Parse query parameters
  const queryParams = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      date: searchParams.get("date") || "",
      time: searchParams.get("time") || "",
    };
  }, [location.search]);

  const [formData, setFormData] = useState({
    startDate: queryParams.date,
    startTime: queryParams.time,
    packageId: "",
    clientNote: "",
  });
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

  // Update form data if URL parameters change
  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      startDate: queryParams.date || prevData.startDate,
      startTime: queryParams.time || prevData.startTime,
    }));
  }, [queryParams.date, queryParams.time]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, packageId: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedPackage = therapistDetails?.packages.find(
      (pkg) => pkg.id.toString() === formData.packageId,
    );

    const combinedDateTimeString = `${formData.startDate}T${formData.startTime}:00Z`;
    const combinedDateTime = new Date(
      `${formData.startDate}T${formData.startTime}:00Z`,
    );

    const appointmentPayload = {
      startTime: combinedDateTimeString,
      endTime: new Date(
        combinedDateTime.getTime() +
        selectedPackage.minutesPerAppointment * 60000,
      ).toISOString(),
      meetUrl: "string",
      clientNote: formData.clientNote,
      therapistId: parseInt(id),
      packageId: parseInt(formData.packageId),
    };

    console.log("Appointment payload:", appointmentPayload);

    try {
      setIsLoading(true);
      await createAppointment(user?.accountId, appointmentPayload);
      toast.success("Appointment booked successfully!");
      navigate("/member/appointments");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to book appointment");
    } finally {
      setIsLoading(false);
    }
  };

  // Memoized calculation of selected package details
  const selectedPackageDetails = useMemo(() => {
    if (!formData.packageId || !therapistDetails) return null;

    const pkg = therapistDetails.packages.find(
      (p) => p.id.toString() === formData.packageId,
    );

    return pkg
      ? {
        ...pkg,
        endTime: formData.startTime
          ? calculateEndTime(formData.startTime, pkg.minutesPerAppointment)
          : null,
      }
      : null;
  }, [formData.packageId, formData.startTime, therapistDetails]);

  if (isLoading) return <Spinner />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            Book Appointment
          </CardTitle>
          <CardDescription className="text-gray-600">
            Schedule a session with {therapistDetails?.firstName}{" "}
            {therapistDetails?.lastName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label
                htmlFor="startDate"
                className="flex items-center gap-2 mb-2"
              >
                <Calendar className="h-4 w-4 text-blue-600" />
                Appointment Date
              </Label>
              <Input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full"
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div>
              <Label
                htmlFor="startTime"
                className="flex items-center gap-2 mb-2"
              >
                <Clock className="h-4 w-4 text-blue-600" />
                Start Time
              </Label>
              <Input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="packageId"
                className="flex items-center gap-2 mb-2"
              >
                <Package className="h-4 w-4 text-blue-600" />
                Select Service Package
              </Label>
              <Select
                onValueChange={handleSelectChange}
                value={formData.packageId}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a service package" />
                </SelectTrigger>
                <SelectContent>
                  {therapistDetails?.packages.map((pkg) => (
                    <SelectItem key={pkg.id} value={pkg.id.toString()}>
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">{pkg.name}</span>
                          <span className="text-muted-foreground text-sm">
                            {pkg.price} VND
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Duration: {pkg.minutesPerAppointment} minutes
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedPackageDetails && (
              <div className="bg-blue-50 p-3 rounded-lg flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    {selectedPackageDetails.name}
                  </p>
                  <div className="text-xs text-blue-600 flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>
                      {formatTimeString(formData.startTime)} -{" "}
                      {selectedPackageDetails.endTime}
                    </span>
                  </div>
                </div>
                <div className="text-sm font-bold text-blue-700">
                  {selectedPackageDetails.price} VND
                </div>
              </div>
            )}

            <div>
              <Label
                htmlFor="clientNote"
                className="flex items-center gap-2 mb-2"
              >
                <MessageSquare className="h-4 w-4 text-blue-600" />
                Additional Notes
              </Label>
              <textarea
                id="clientNote"
                name="clientNote"
                value={formData.clientNote}
                onChange={handleChange}
                placeholder="Any special requests or notes"
                className="w-full p-3 border rounded-md min-h-[100px] resize-y"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
              disabled={
                !formData.startDate ||
                !formData.startTime ||
                !formData.packageId
              }
            >
              <Check className="mr-2 h-4 w-4" /> Book Appointment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookAppointmentForm;
