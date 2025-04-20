import { auth } from "@/auth";
import { CompanyRole } from "@prisma/client";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentManager= async () => {
  const user = await currentUser();
  return user?.role === CompanyRole.MANAGER ? user : null;
};

export const currentMember = async () => {
  const user = await currentUser();
  const allowedRoles = [
    CompanyRole.ASSISTANT,
    CompanyRole.DENTIST,
    CompanyRole.DENTALTECHNICIAN,
    CompanyRole.PENDING,
    CompanyRole.COMANAGER,
  ];

  return allowedRoles.includes(user?.role) ? user : null;
}