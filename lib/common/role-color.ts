import { CompanyRole } from "@prisma/client";

export const getBgRoleColor = (role?: CompanyRole) => {
  switch (role) {
    case CompanyRole.MANAGER:
      return "bg-charoite";
    case CompanyRole.COMANAGER:
      return "bg-blue-400";
    case CompanyRole.DENTIST:
      return "bg-teal-500";
    case CompanyRole.DENTALTECHNICIAN:
      return "bg-amber-500";
    case CompanyRole.ASSISTANT:
      return "bg-purple-400";
    default:
      return "bg-gray-400";
  }
};

export const getTextRoleColor = (role?: CompanyRole) => {
  switch (role) {
    case CompanyRole.MANAGER:
      return "text-charoite";
    case CompanyRole.COMANAGER:
      return "text-blue-400";
    case CompanyRole.DENTIST:
      return "text-teal-500";
    case CompanyRole.DENTALTECHNICIAN:
      return "text-amber-500";
    case CompanyRole.ASSISTANT:
      return "text-purple-400";
    default:
      return "text-gray-400";
  }
};