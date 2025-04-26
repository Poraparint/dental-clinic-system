import { MANAGER_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";
import { currentManager, currentUser } from "@/lib/auth";
import { getMemberByCompanyId } from "@/data/internal/member";
import { CompanyRole } from "@prisma/client";

export default async function CompanyHomePage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const manager = await currentManager();
  const memberId = await currentUser();

  if (!companyId) {
    redirect(`${MANAGER_LOGIN_REDIRECT}`);
  }

  // ถ้าเป็น manager
  if (manager) {
    redirect(`${MANAGER_LOGIN_REDIRECT}`);
  }
  // ถ้าเป็น user อื่นๆ (dentist, assistant, etc.)
  else if (memberId) {
    try {
      const member = await getMemberByCompanyId(memberId.id, companyId);

      if (!member) {
        redirect("/");
      }

      // Redirect ตาม role
      switch (member.role) {
        case CompanyRole.DENTIST:
          redirect(`/${companyId}/dentist`);
        case CompanyRole.DENTALTECHNICIAN:
          redirect(`/${companyId}/dental-technician`);
        case CompanyRole.ASSISTANT:
          redirect(`/${companyId}/assistant`);
        case CompanyRole.COMANAGER:
          redirect(`/${companyId}/co-manager`);
        case CompanyRole.PENDING:
          redirect(`/${companyId}/pending`);
        default:
          redirect("/");
      }
    } catch (error) {
      console.error("Error fetching member:", error);
      redirect("/");
    }
  }
  // ถ้าไม่มีทั้ง manager และ user
  else {
    redirect("/");
  }
}
