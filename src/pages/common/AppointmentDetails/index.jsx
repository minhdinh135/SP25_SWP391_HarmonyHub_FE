import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  Video,
  MessageSquare,
  Star,
  User,
  UserCheck,
  Package,
  ChevronLeft,
} from "lucide-react";
import { getAppointmentStatusText } from "@/utils/enumUtils";
import { getAppointmentStatusColor } from "@/utils/colorUtils";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";
import { getAppointmentDetails } from "@/api/appointmentApi";
import { AppointmentStatus } from "@/constants/status";

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getAppointmentDetails(id);
        setAppointmentDetails(data);
      } catch (error) {
        console.log(error);
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) return <Spinner />;

  // Format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format just date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen container mx-auto max-w-4xl py-8">
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Appointments
      </Button>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Appointment ID: {appointmentDetails?.id}
            </p>
            <CardTitle className="text-2xl font-bold">
              Marital Counseling Session
            </CardTitle>
          </div>
          <Badge
            className={`${getAppointmentStatusColor(appointmentDetails?.status)} px-3 py-1.5 text-base`}
          >
            {getAppointmentStatusText(appointmentDetails?.status)}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Session details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Session Details</h3>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p>{formatDate(appointmentDetails?.startTime)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p>
                    {new Date(appointmentDetails?.startTime).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      },
                    )}{" "}
                    -{" "}
                    {new Date(appointmentDetails?.endTime).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      },
                    )}
                  </p>
                </div>
              </div>

              {appointmentDetails?.meetUrl && (
                <div className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Meeting Link
                    </p>
                    <a
                      href={appointmentDetails?.meetUrl}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join Virtual Session
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Package</p>
                  <p>{appointmentDetails?.packageName}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">People</h3>

              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Client</p>
                  <p>{appointmentDetails?.memberFullName}</p>
                  <p className="text-xs text-muted-foreground">
                    ID: {appointmentDetails?.memberId}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <UserCheck className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Therapist</p>
                  <p>{appointmentDetails?.therapistFullName}</p>
                  <p className="text-xs text-muted-foreground">
                    ID: {appointmentDetails?.therapistId}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Notes section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notes</h3>

            {appointmentDetails?.clientNote && (
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-slate-500" />
                  <span className="font-medium">Client Note:</span>
                </div>
                <p className="text-slate-700">
                  {appointmentDetails?.clientNote}
                </p>
              </div>
            )}

            {appointmentDetails?.therapistNote && (
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-slate-500" />
                  <span className="font-medium">Therapist Note:</span>
                </div>
                <p className="text-slate-700">
                  {appointmentDetails?.therapistNote ?? "N/A"}
                </p>
              </div>
            )}

            {!appointmentDetails?.clientNote &&
              !appointmentDetails?.therapistNote && (
                <p className="text-muted-foreground italic">
                  No notes available for this appointment.
                </p>
              )}
          </div>

          {/* Feedback section */}
          {appointmentDetails?.feedbackRating && (
            <>
              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Feedback</h3>

                <div className="rounded-lg bg-blue-50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="font-medium">Client Rating:</span>
                      <span className="text-lg font-semibold">4/5</span>
                    </div>

                    {appointmentDetails?.feedbackDate && (
                      <p className="text-xs text-muted-foreground">
                        Submitted on {formatDateTime("2025-02-14T18:30:00.000")}
                      </p>
                    )}
                  </div>

                  {appointmentDetails?.feedbackContent && (
                    <div className="mt-2">
                      <p className="text-blue-800">
                        Very helpful session, felt heard and got practical
                        advice.{" "}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>

        {appointmentDetails?.status === AppointmentStatus.Completed &&
          !appointmentDetails.feedbackRating && (
            <CardFooter className="border-t pt-6 flex justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Provide Feedback
              </Button>
            </CardFooter>
          )}
      </Card>
    </div>
  );
};

export default AppointmentDetails;
