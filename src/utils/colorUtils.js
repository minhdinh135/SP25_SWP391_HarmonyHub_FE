import { AccountStatus, AppointmentStatus } from "@/constants/status";

export const getAccountStatusColor = (statusEnum) => {
  switch (statusEnum) {
    case AccountStatus.Active:
      return "bg-green-200 text-green-600";
    case AccountStatus.Inactive:
      return "bg-red-200 text-red-600";
    case AccountStatus.Pending:
      return "bg-yellow-200 text-yellow-600";
    default:
      return "bg-gray-200 text-gray-600";
  }
};

export const getAppointmentStatusColor = (statusEnum) => {
  switch (statusEnum) {
    case AppointmentStatus.Pending:
      return "bg-yellow-500";
    case AppointmentStatus.Accepted:
      return "bg-green-500";
    case AppointmentStatus.Completed:
      return "bg-blue-500";
    case AppointmentStatus.Rejected:
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};
