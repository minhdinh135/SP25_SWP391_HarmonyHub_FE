const RolePermissions = {
  Admin: [
    "read:accounts",
    "create:accounts",
    "update:accounts",
    "delete:accounts",
  ],
  Member: ["read:ownProfile"],
  Therapist: ["read:ownProfile"],
};

export const hasPermission = (role, permission) => {
  return RolePermissions[role].includes(permission);
};
