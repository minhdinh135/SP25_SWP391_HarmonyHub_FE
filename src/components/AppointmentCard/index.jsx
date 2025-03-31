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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect } from "react";
import { useState } from "react";
import { getAccountById } from "@/api/accountApi";

const AppointmentCard = ({
  appointment,
  onAccept,
  onReject,
  handleCancelAppointment,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [avatarUrl, setAvatarUrl] = useState(null);

  const isMember = getRoleText(user.role) === "Member";
  const userFullName = isMember
    ? appointment.therapistFullName
    : appointment.memberFullName;
  const userRole = isMember ? "Therapist" : "Client";
  const isCancellable = ![
    AppointmentStatus.Cancelled,
    AppointmentStatus.Completed,
    AppointmentStatus.Rejected,
  ].includes(appointment.status);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = isMember
          ? appointment.therapistId
          : appointment.memberId;
        const data = await getAccountById(userId);
        setAvatarUrl(data.avatarUrl);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    console.log("AppointmentID:", appointment.id);

    navigate(`/appointments/${appointment.id}`);
  };

  // Get initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card
      className="w-full max-w-4xl mb-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">
          Marital counseling session with {userRole}
        </CardTitle>
        <Badge className={getAppointmentStatusColor(appointment.status)}>
          {getAppointmentStatusText(appointment.status)}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Left side - Avatar and name */}
          <div className="flex flex-col items-center sm:items-start sm:w-1/4">
            <Avatar className="h-16 w-16 mb-2">
              <AvatarImage src={avatarUrl} alt={userFullName} />
              <AvatarFallback className="bg-blue-100 text-blue-800">
                {getInitials(userFullName)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <div className="font-medium">{userFullName}</div>
              <div className="text-sm text-gray-500">{userRole}</div>
            </div>
          </div>

          {/* Right side - Appointment details */}
          <div className="sm:w-3/4 space-y-4">
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
                      onClick={(e) => e.stopPropagation()}
                    >
                      Join Meeting
                    </a>
                  ) : (
                    <span className="text-sm">Meeting link not available</span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Package:</span>{" "}
                  {appointment.packageName}
                </div>
              </div>
            </div>

            {appointment.clientNote && (
              <div className="mt-2">
                <div className="flex items-center space-x-2 mb-1">
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                  <span className="font-medium text-sm">Client Note:</span>
                </div>
                <p className="text-sm text-gray-600 pl-6">
                  {appointment.clientNote}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-2">
              {appointment.status === AppointmentStatus.Pending &&
                hasPermission(
                  getRoleKey(user.role),
                  "update:appointmentStatus",
                ) && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAccept(appointment.id);
                      }}
                    >
                      <Check className="h-4 w-4 mr-1" /> Accept
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onReject(appointment.id);
                      }}
                    >
                      <X className="h-4 w-4 mr-1" /> Reject
                    </Button>
                  </>
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
                  <X className="h-4 w-4 mr-1" /> Cancel Appointment
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>{" "}
    </Card>
  );
};

export default AppointmentCard;
