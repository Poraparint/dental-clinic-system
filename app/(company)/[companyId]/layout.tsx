import { getCompanyByManagerId } from "@/data/company";
import { currentManagerId } from "@/lib/auth";
import { notFound } from "next/navigation";

type CompanyLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ companyId: string; managerId: string }>;
};

export default async function CompanyLayout({
  children,
  params,
}: CompanyLayoutProps) {
  try {
    const { companyId } = await params;
    console.log("Company ID:", companyId);
    const managerId = await currentManagerId();
    
    console.log("Manager ID:", managerId);
    if (!companyId) {
      console.error("Company ID is undefined");
      notFound();
    }
    const company = await getCompanyByManagerId(companyId, managerId);
    if (!company) {
      console.error("Company not found for the given companyId and managerId");
      notFound();
    }
  } catch (error) {
    console.error("Error in CompanyLayout:", error);
    return null;
  }

  return <>{children}</>;
}
