

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";


export default function CompanyHomePage({ params }: { params: { companyId: string } }) {
  const { companyId } = params;

  redirect(`/${companyId}${DEFAULT_LOGIN_REDIRECT}`);

  return null; 
}
