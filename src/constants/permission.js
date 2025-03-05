const RolePermissions = {
  Admin: [
    "read:accounts",
    "create:accounts",
    "update:accounts",
    "delete:accounts",
  ],
  Member: ["read:ownProfile", "create:appointment"],
  Therapist: ["read:ownProfile", "update:appointmentStatus"],
};

export const hasPermission = (role, permission) => {
  return RolePermissions[role]?.includes(permission);
};
