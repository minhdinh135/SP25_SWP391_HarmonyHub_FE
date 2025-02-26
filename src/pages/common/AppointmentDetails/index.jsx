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

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real app, you would fetch the appointment details using the id
  // For demonstration, I'll use a mock appointment
  const appointment = {
    id: id,
    startTime: "2025-02-14T16:44:22.009",
    endTime: "2025-02-14T17:44:22.009",
    meetUrl: "https://meet.example.com/abc123",
    clientNote: "I'm looking forward to discussing our communication issues.",
    therapistNote: "Prepared materials on active listening techniques.",
    feedbackRating: 4,
    feedbackContent:
      "Very helpful session, felt heard and got practical advice.",
    feedbackDate: "2025-02-14T18:30:00.000",
    status: 2,
    memberId: 2,
    memberFullName: "minh dinh",
    therapistId: 3,
    therapistFullName: "tien gout",
    packageId: 1,
    packageName: "Couples Counseling - Standard Package",
  };

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
              Appointment ID: {appointment.id}
            </p>
            <CardTitle className="text-2xl font-bold">
              Marital Counseling Session
            </CardTitle>
          </div>
          <Badge
            className={`${getAppointmentStatusColor(appointment.status)} px-3 py-1.5 text-base`}
          >
            {getAppointmentStatusText(appointment.status)}
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
                  <p>{formatDate(appointment.startTime)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p>
                    {new Date(appointment.startTime).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      },
                    )}{" "}
                    -{" "}
                    {new Date(appointment.endTime).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>

              {appointment.meetUrl && (
                <div className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Meeting Link
                    </p>
                    <a
                      href={appointment.meetUrl}
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
                  <p>{appointment.packageName}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">People</h3>

              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Client</p>
                  <p>{appointment.memberFullName}</p>
                  <p className="text-xs text-muted-foreground">
                    ID: {appointment.memberId}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <UserCheck className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Therapist</p>
                  <p>{appointment.therapistFullName}</p>
                  <p className="text-xs text-muted-foreground">
                    ID: {appointment.therapistId}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Notes section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notes</h3>

            {appointment.clientNote && (
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-slate-500" />
                  <span className="font-medium">Client Note:</span>
                </div>
                <p className="text-slate-700">{appointment.clientNote}</p>
              </div>
            )}

            {appointment.therapistNote && (
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-slate-500" />
                  <span className="font-medium">Therapist Note:</span>
                </div>
                <p className="text-slate-700">{appointment.therapistNote}</p>
              </div>
            )}

            {!appointment.clientNote && !appointment.therapistNote && (
              <p className="text-muted-foreground italic">
                No notes available for this appointment.
              </p>
            )}
          </div>

          {/* Feedback section */}
          {appointment.feedbackRating && (
            <>
              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Feedback</h3>

                <div className="rounded-lg bg-blue-50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="font-medium">Client Rating:</span>
                      <span className="text-lg font-semibold">
                        {appointment.feedbackRating}/5
                      </span>
                    </div>

                    {appointment.feedbackDate && (
                      <p className="text-xs text-muted-foreground">
                        Submitted on {formatDateTime(appointment.feedbackDate)}
                      </p>
                    )}
                  </div>

                  {appointment.feedbackContent && (
                    <div className="mt-2">
                      <p className="text-blue-800">
                        {appointment.feedbackContent}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>

        {appointment.status === 2 && !appointment.feedbackRating && (
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
