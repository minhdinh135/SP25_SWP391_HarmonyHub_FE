import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, MessageSquare, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { getRoleText } from "@/utils/enumUtils";

const AppointmentCard = ({ appointment }) => {
  const { user } = useAuth();

  const navigate = useNavigate();

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

  // Get status badge color and text
  const getStatusBadge = (status) => {
    const statusMap = {
      0: { label: "Pending", className: "bg-yellow-500" },
      1: { label: "Confirmed", className: "bg-green-500" },
      2: { label: "Completed", className: "bg-blue-500" },
      3: { label: "Cancelled", className: "bg-red-500" },
    };
    return statusMap[status] || { label: "Unknown", className: "bg-gray-500" };
  };

  const statusBadge = getStatusBadge(appointment.status);

  const handleClick = () => {
    console.log("AppointmentID:", appointment.id);

    // navigate(`/member/appointments/${appointment.id}`);
    navigate(`/appointments/${appointment.id}`);
  };

  return (
    <Card
      className="w-full max-w-2xl mb-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">
          Marital Counseling Session
        </CardTitle>
        <Badge className={statusBadge.className}>{statusBadge.label}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm">
                {formatDateTime(appointment.startTime)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Duration: 1 hour</span>
            </div>
            <div className="flex items-center space-x-2">
              <Video className="h-4 w-4 text-gray-500" />
              {appointment.meetUrl ? (
                <a
                  href={appointment.meetUrl}
                  className="text-sm text-blue-600 hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Meeting
                </a>
              ) : (
                <span>N/A</span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">Client:</span>{" "}
              {appointment.memberFullName}
            </div>
            <div className="text-sm">
              <span className="font-medium">Therapist:</span>{" "}
              {appointment.therapistFullName}
            </div>
            <div className="text-sm">
              <span className="font-medium">Package:</span>{" "}
              {appointment.packageName}
            </div>
          </div>
        </div>

        {appointment.clientNote && (
          <div className="mt-4">
            <div className="flex items-center space-x-2 mb-2">
              <MessageSquare className="h-4 w-4 text-gray-500" />
              <span className="font-medium">Client Note:</span>
            </div>
            <p className="text-sm text-gray-600 pl-6">
              {appointment.clientNote}
            </p>
          </div>
        )}

        {appointment.feedbackRating && (
          <div className="mt-4 border-t pt-4">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">Feedback:</span>
              <span className="text-sm">{appointment.feedbackRating}/5</span>
            </div>
            {appointment.feedbackContent && (
              <p className="text-sm text-gray-600 pl-6">
                {appointment.feedbackContent}
              </p>
            )}
            {appointment.feedbackDate && (
              <p className="text-xs text-gray-400 pl-6 mt-1">
                Submitted on {formatDateTime(appointment.feedbackDate)}
              </p>
            )}
          </div>
        )}
      </CardContent>

      {appointment.feedbackRating && (
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">Feedback:</span>
            <span className="text-sm">{appointment.feedbackRating}/5</span>
          </div>
          {appointment.feedbackContent && (
            <p className="text-sm text-gray-600 pl-6">
              {appointment.feedbackContent}
            </p>
          )}
          {appointment.feedbackDate && (
            <p className="text-xs text-gray-400 pl-6 mt-1">
              Submitted on {formatDateTime(appointment.feedbackDate)}
            </p>
          )}
        </div>
      )}
    </Card>
  );
};

export default AppointmentCard;
