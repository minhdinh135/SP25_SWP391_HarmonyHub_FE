import {
  AccountStatus,
  AppointmentStatus,
  BlogStatus,
  QuizStatus,
  ReportStatus,
  TransactionStatus,
} from "@/constants/status";

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
    case AppointmentStatus.Paid:
      return "bg-teal-500";
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

export const getBlogStatusColor = (statusEnum) => {
  switch (statusEnum) {
    case BlogStatus.Active:
      return "bg-green-500";
    case BlogStatus.Pending:
      return "bg-yellow-500";
    case BlogStatus.Inactive:
      return "bg-red-500";
  }
};

export const getQuizStatusColor = (statusEnum) => {
  switch (statusEnum) {
    case QuizStatus.Active:
      return "bg-green-500";
    case QuizStatus.Pending:
      return "bg-yellow-500";
    case QuizStatus.Inactive:
      return "bg-red-500";
  }
};

export const getReportStatusColor = (statusEnum) => {
  switch (statusEnum) {
    case ReportStatus.Resolved:
      return "bg-green-500";
    case ReportStatus.Pending:
      return "bg-yellow-500";
    case ReportStatus.Dismissed:
      return "bg-red-500";
  }
};

export const getTransactionStatusColor = (statusEnum) => {
  switch (statusEnum) {
    case TransactionStatus.Created:
      return "bg-blue-500";
    case TransactionStatus.Successful:
      return "bg-green-500";
    case TransactionStatus.Cancelled:
      return "bg-yellow-500";
    case TransactionStatus.Failed:
      return "bg-red-500";
    default:
      return "bg-blue-500";
  }
};
