import { CompanyRole } from "@prisma/client";

export const getBgRoleColor = (role?: CompanyRole) => {
  if (role === CompanyRole.MANAGER) {
    return "bg-charoite";
  } else if (role === CompanyRole.COMANAGER) {
    return "bg-blue-400";
  } else if (role === CompanyRole.DENTIST) {
    return "bg-teal-500";
  } else if (role === CompanyRole.DENTALTECHNICIAN) {
    return "bg-amber-500";
  } else if (role === CompanyRole.ASSISTANT) {
    return "bg-purple-400";
  } else {
    return "bg-gray-400";
  }
};

export const getTextRoleColor = (role?: CompanyRole) => {
  if (role === CompanyRole.MANAGER) {
    return "text-charoite";
  } else if (role === CompanyRole.COMANAGER) {
    return "text-blue-400";
  } else if (role === CompanyRole.DENTIST) {
    return "text-teal-500";
  } else if (role === CompanyRole.DENTALTECHNICIAN) {
    return "text-amber-500";
  } else if (role === CompanyRole.ASSISTANT) {
    return "text-purple-400";
  } else {
    return "text-gray-400";
  }
};