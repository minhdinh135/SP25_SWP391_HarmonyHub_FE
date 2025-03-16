import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, MessageSquare, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAppointmentStatusText, getRoleText } from "@/utils/enumUtils";
import { getAppointmentStatusColor } from "@/utils/colorUtils";
import { Button } from "../ui/button";
import { AppointmentStatus } from "@/constants/status";
import { getRoleKey } from "@/constants/role";
import useAuth from "@/hooks/useAuth";
import { hasPermission } from "@/constants/permission";
import { formatDateTime } from "@/utils/dateUtils";

const AppointmentCard = ({
  appointment,
  onAccept,
  onReject,
  handleCancelAppointment,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isMember = getRoleText(user.role) === "Member";

  const isCancellable = ![
    AppointmentStatus.Cancelled,
    AppointmentStatus.Completed,
    AppointmentStatus.Rejected,
  ].includes(appointment.status);

  const handleClick = () => {
    console.log("AppointmentID:", appointment.id);

    navigate(`/appointments/${appointment.id}`);
  };

  return (
    <Card
      className="w-full max-w-4xl mb-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">
          Marital Counseling Session
        </CardTitle>
        <Badge className={getAppointmentStatusColor(appointment.status)}>
          {getAppointmentStatusText(appointment.status)}
        </Badge>
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

        {appointment.status === AppointmentStatus.Pending &&
          hasPermission(getRoleKey(user.role), "update:appointmentStatus") && (
            <div className="mt-4 border-t pt-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click event
                    onAccept(appointment.id);
                  }}
                >
                  <Check className="h-4 w-4 mr-2" /> Accept
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click event
                    onReject(appointment.id);
                  }}
                >
                  <X className="h-4 w-4 mr-2" /> Reject
                </Button>
              </div>
            </div>
          )}

        {isMember && isCancellable && (
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
            onClick={(e) => {
              e.stopPropagation();
              handleCancelAppointment(appointment.id);
            }}
          >
            <X className="h-4 w-4 mr-2" /> Cancel Appointment
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
