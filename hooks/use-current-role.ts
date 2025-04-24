import { useSession } from "next-auth/react";

export const useCurrentRole = () => {
  const { data: session } = useSession();
  return session?.user?.role; // เช่น DENTIST, ASSISTANT
};

export const useCurrentRoleType = () => {
  const { data: session } = useSession();
  return session?.user?.roleType; // "MANAGER" หรือ "MEMBER"
};

export const useCurrentManagerRole = () => {
  const roleType = useCurrentRoleType();
  return roleType === "MANAGER";
};

export const useCurrentMemberRole = () => {
  const roleType = useCurrentRoleType();
  return roleType === "MEMBER";
};
