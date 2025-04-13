import { redirect } from "next/navigation";

export default function CompanyPage({
  params,
}: {
  params: { companyId: string };
}) {
  // Redirect ไปที่ dashboard โดยอัตโนมัติ
  redirect(`/${params.companyId}/dashboard`);
}
