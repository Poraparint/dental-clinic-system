import { auth } from "@/auth";
import { CompanyRole } from "@prisma/client";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentByRoles = async (allowedRoles: CompanyRole[]) => {
  const user = await currentUser();
  if (!user || !user.role) return null;

  // Check if role is valid CompanyRole
  if (!(Object.values(CompanyRole) as string[]).includes(user.role)) {
    return null;
  }


  return allowedRoles.includes(user?.role as CompanyRole) ? user : null;
};

export const currentManager = async () => currentByRoles([CompanyRole.MANAGER]);

export const currentManagerAndTechnician = async () =>
  currentByRoles([
    CompanyRole.MANAGER,
    CompanyRole.COMANAGER,
    CompanyRole.DENTALTECHNICIAN,
  ]);

export const currentManagerAndDentist = async () =>
  currentByRoles([
    CompanyRole.MANAGER,
    CompanyRole.COMANAGER,
    CompanyRole.DENTIST,
  ]);

export const currentAllStaffExceptAssistant = async () =>
  currentByRoles([
    CompanyRole.MANAGER,
    CompanyRole.COMANAGER,
    CompanyRole.DENTIST,
    CompanyRole.DENTALTECHNICIAN,
  ]);

export const currentAllStaffExceptTechnician = async () =>
  currentByRoles([
    CompanyRole.MANAGER,
    CompanyRole.COMANAGER,
    CompanyRole.DENTIST,
    CompanyRole.ASSISTANT,
  ]);