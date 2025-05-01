import { getCompanyByManagerId } from "@/data/internal/company";
import { getMemberByCompanyId } from "@/data/internal/member";
import { currentManager, currentUser } from "@/lib/auth";
import { MANAGER_LOGIN_REDIRECT } from "@/routes";
import {  redirect } from "next/navigation";

type CompanyLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ companyId: string; }>;
};

export default async function CompanyLayout({
  children,
  params,
}: CompanyLayoutProps) {
  try {
    const { companyId } = await params;
    const managerId = await currentManager();
    const memberId = await currentUser();

    if (!managerId && !memberId) {
      redirect("auth/login");
    }

    if (!companyId) {
      redirect("/");
    }

    if (managerId) {
      const company = await getCompanyByManagerId(companyId, managerId.id);
      if (!company) {
        redirect(`${MANAGER_LOGIN_REDIRECT}`);
      }
    } else if (memberId) {
      const member = await getMemberByCompanyId(companyId, memberId.id);
      if (!member) {
        redirect("/");
      }
    }
  } catch (error) {
    console.log("Error in CompanyLayout:", error);
    throw error;
  }

  return <>{children}</>;
}
