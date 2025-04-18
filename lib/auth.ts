import { auth } from "@/auth";

export const currentManager = async () => {
  const session = await auth();

  return session?.user;
};

export const currentManagerId = async () => {
  const session = await auth();

  return session?.user?.id;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.companyRoles;
};