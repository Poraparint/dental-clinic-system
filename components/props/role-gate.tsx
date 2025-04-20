"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { CompanyRole } from "@prisma/client";

interface RoleGateProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
  allowedRole: CompanyRole;
}

export const RoleGate = ({ children, fallback, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <>{fallback}</>
      
    );
  }

  return <>{children}</>;
};
