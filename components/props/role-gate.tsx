"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { useCurrentUser } from "@/hooks/use-current-user";
import { CompanyRole } from "@prisma/client";
import {PermissionDenied} from "@/components/companys/fallbacks/permissionDenied";

interface RoleGateProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  allowedRole: CompanyRole[];
}

export const RoleGate = ({
  children,
  fallback,
  allowedRole,
}: RoleGateProps) => {
  const user = useCurrentUser();
  const role = useCurrentRole();

  if (!user) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return <PermissionDenied/>;
  }
  

  if (!allowedRole.includes(role)) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return <PermissionDenied />;
  }

  return <>{children}</>;
};
