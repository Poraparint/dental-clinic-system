

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";

export default function CompanyHomePage({ params }: { params: { companyId: string } }) {
  const { companyId } = params;

  if (!companyId) {
    redirect("/");
  }

  redirect(`/${companyId}${DEFAULT_LOGIN_REDIRECT}`);

  
}
