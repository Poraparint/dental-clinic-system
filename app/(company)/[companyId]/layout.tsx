import { getCompanyByManagerId } from "@/data/internal/company";
import { currentManager, currentUser } from "@/lib/auth";
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
    const managerId = await currentManager();
    const existingUser = await currentUser();

    if (!managerId && !existingUser) {
      notFound();
    }
    if (managerId || existingUser) {
      if (!companyId) {
        console.log("Company ID is undefined");
        notFound();
      }
      const company = await getCompanyByManagerId(companyId, managerId.id);
      if (!company) {
        notFound();
      }
    }
  } catch (error) {
    console.log("Error in CompanyLayout:", error);
    throw error;
  }

  return <>{children}</>;
}
