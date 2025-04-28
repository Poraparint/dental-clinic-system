"use client";

import { Loading } from "@/components/loading";
import { DynamicTable } from "@/components/props/dynamic-table";
import { useMembers } from "@/hooks/internal/use-member";
import { CompanyRole } from "@prisma/client";
import { useParams } from "next/navigation";

interface MemberCategory {
  id: string;
  createdAt: Date;
  memberCode: string;
  role: CompanyRole;
  user: {
    name: string;
    email: string;
    phone: string;
    isTwoFactorEnabled: boolean;
  };
}
export const MemberTable = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const { members, isLoading } = useMembers(companyId);

  const columns = [
    {
      key: "name",
      header: "ชื่อพนักงาน",
      render: (item: MemberCategory) => item.user.name,
    },
    {
      key: "phone",
      header: "เบอร์ติดต่อ",
      render: (item: MemberCategory) => item.user.phone,
    },
    {
      key: "email",
      header: "อีเมล",
      render: (item: MemberCategory) => item.user.email,
    },
    {
      key: "isTwoFactorEnabled",
      header: "2FA",
      render: (item: MemberCategory) =>
        item.user.isTwoFactorEnabled ? "ON" : "OFF",
    },
    {
      key: "memberCode",
      header: "รหัสพนักงาน",
      render: (item: MemberCategory) => item.memberCode,
    },
    {
      key: "createdAt",
      header: "บันทึกเมื่อ",
      render: (item: MemberCategory) =>
        new Date(item.createdAt).toLocaleDateString("th-TH", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      key: "role",
      header: "ตำแหน่ง",
      render: (item: MemberCategory) => item.role as CompanyRole,
    },
  ];

  if (isLoading) {
    return <Loading />;
  }
  return (
    <DynamicTable
      data={members}
      columns={columns}
      error="เริ่มต้นด้วยการสร้างบัญชีสมาชิก"
      description="เหมือนคุณยังไม่มีสมาชิกเลย"
      url="/"
      urlname="เพิ่มบัญชีสมาชิก"
    />
  );
};
