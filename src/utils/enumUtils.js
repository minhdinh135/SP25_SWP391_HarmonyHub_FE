export const getStatusText = (statusEnum) => {
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
