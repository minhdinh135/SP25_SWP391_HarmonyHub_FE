export const Roles = {
  Member: 1,
  Therapist: 2,
  System: 3,
  Admin: 0,
};

export const getRoleKey = (value) => {
  return Object.keys(Roles).find((key) => Roles[key] === value);
};
