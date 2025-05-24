import { Dashboard } from "@/components/companys/internal/dashboard/dashboard";
import { RoleGate } from "@/components/props/wrapper/role-gate";
import { MANAGER_LOGIN_REDIRECT } from "@/routes";
import { CompanyRole } from "@prisma/client";
import { redirect } from "next/navigation";

type DashboardPageProps = {
  params: Promise<{ companyId: string }>;
};
const DashboardPage = async ({ params }: DashboardPageProps) => {
  const { companyId } = await params;

  if (!companyId) {
    redirect(`${MANAGER_LOGIN_REDIRECT}`);
  }

  return (
    <RoleGate allowedRole={[CompanyRole.MANAGER]}>
      <Dashboard />
    </RoleGate>
  );
}
export default DashboardPage;
