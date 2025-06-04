"use client";

import { Dashboard } from "@/components/companys/internal/dashboard/dashboard";
import { RoleGate } from "@/components/props/wrapper/role-gate";
import { useCompany } from "@/context/context";
import { MANAGER_LOGIN_REDIRECT } from "@/routes";
import { CompanyRole } from "@prisma/client";
import { redirect } from "next/navigation";

const DashboardPage = () => {
  const { companyId } = useCompany();

  if (!companyId) {
    redirect(`${MANAGER_LOGIN_REDIRECT}`);
  }

  return (
    <RoleGate allowedRole={[CompanyRole.MANAGER, CompanyRole.COMANAGER]}>
      <Dashboard />
    </RoleGate>
  );
};
export default DashboardPage;
