

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";


export default async function CompanyHomePage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;

  if (!companyId) {
    redirect("/");
  }

  redirect(`/${companyId}${DEFAULT_LOGIN_REDIRECT}`);

  
}
