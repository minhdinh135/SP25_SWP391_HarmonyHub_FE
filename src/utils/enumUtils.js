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
