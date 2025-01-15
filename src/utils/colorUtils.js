import { Status } from "@/constants/status";

export const getStatusColor = (statusEnum) => {
  switch (statusEnum) {
    case Status.Active:
      return "bg-green-200 text-green-600";
    case Status.Inactive:
      return "bg-red-200 text-red-600";
    case Status.Pending:
      return "bg-yellow-200 text-yellow-600";
    default:
      return "bg-gray-200 text-gray-600";
  }
};
