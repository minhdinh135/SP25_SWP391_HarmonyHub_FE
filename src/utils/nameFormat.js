export const getFullName = (firstName, lastName) => {
  if (!firstName) firstName = "";
  if (!lastName) lastName = "";
  return firstName + " " + lastName;
};
