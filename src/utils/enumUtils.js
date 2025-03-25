import {
  AppointmentStatus,
  BlogStatus,
  QuizStatus,
  ReportStatus,
  TransactionStatus,
} from "@/constants/status";

export const getAccountStatusText = (statusEnum) => {
  switch (statusEnum) {
    case 1:
      return "Active";
    case 2:
      return "Pending";
    case 0:
      return "Inactive";
    default:
      return "Active";
  }
};

export const getAppointmentStatusText = (statusEnum) => {
  switch (statusEnum) {
    case AppointmentStatus.Cancelled:
      return "Cancelled";
    case AppointmentStatus.Booked:
      return "Booked";
    case AppointmentStatus.Pending:
      return "Pending";
    case AppointmentStatus.Accepted:
      return "Accepted";
    case AppointmentStatus.Rejected:
      return "Rejected";
    case AppointmentStatus.Completed:
      return "Completed";
    default:
      return "Completed";
  }
};

export const getBlogStatusText = (statusEnum) => {
  switch (statusEnum) {
    case BlogStatus.Active:
      return "Active";
    case BlogStatus.Pending:
      return "Pending";
    case BlogStatus.Inactive:
      return "Inactive";
    default:
      return "Active";
  }
};

export const getQuizStatusText = (statusEnum) => {
  switch (statusEnum) {
    case QuizStatus.Active:
      return "Active";
    case QuizStatus.Pending:
      return "Pending";
    case QuizStatus.Inactive:
      return "Inactive";
    default:
      return "Active";
  }
};

export const getReportStatusText = (statusEnum) => {
  switch (statusEnum) {
    case ReportStatus.Active:
      return "Active";
    case ReportStatus.Pending:
      return "Pending";
    case ReportStatus.Resolved:
      return "Resolved";
    case ReportStatus.Inactive:
      return "Inactive";
    default:
      return "Active";
  }
};

export const getTransactionStatusText = (statusEnum) => {
  switch (statusEnum) {
    case TransactionStatus.Created:
      return "Created";
    case TransactionStatus.Successful:
      return "Successful";
    case TransactionStatus.Cancelled:
      return "Cancelled";
    case TransactionStatus.Failed:
      return "Failed";
    default:
      return "Created";
  }
};

export const getRoleText = (roleEnum) => {
  switch (roleEnum) {
    case 1:
      return "Member";
    case 2:
      return "Therapist";
    case 3:
      return "System";
    case 0:
      return "Admin";
    default:
      return "Member";
  }
};

export const getGenderText = (genderEnum) => {
  switch (genderEnum) {
    case 1:
      return "Male";
    case 2:
      return "Female";
    case 0:
      return "Prefer not to say";
    default:
      return "Prefer not to say";
  }
};

export const getDayOfWeek = (dayOfWeekEnum) => {
  switch (dayOfWeekEnum) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 7:
      return "Sunday";
  }
};
