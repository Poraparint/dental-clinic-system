"use client";
//icons
import {
  Mail,
  Phone,
  User,
  ShieldCheck,
  Barcode,
  CalendarDays,
  BriefcaseBusiness,
} from "lucide-react";

import { Loading } from "@/components/loading";
import { DynamicTable } from "@/components/props/dynamic-table";
import { useMembers } from "@/hooks/internal/use-member";
import { CompanyRole } from "@prisma/client";
import { useParams } from "next/navigation";
import { formatDate } from "@/lib/utils";

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
      render: (item: MemberCategory) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-lapis-accent" />
          {item.user.name}
        </div>
      ),
    },
    {
      key: "phone",
      header: "เบอร์ติดต่อ",
      render: (item: MemberCategory) => (
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-jade" />
          {item.user.phone}
        </div>
      ),
    },
    {
      key: "email",
      header: "อีเมล",
      render: (item: MemberCategory) => (
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-amber-500" />
          {item.user.email}
        </div>
      ),
    },
    {
      key: "isTwoFactorEnabled",
      header: "2FA",
      render: (item: MemberCategory) => (
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-jade" />
          {item.user.isTwoFactorEnabled ? "ON" : "OFF"}
        </div>
      ),
    },
    {
      key: "memberCode",
      header: "รหัสพนักงาน",
      render: (item: MemberCategory) => (
        <div className="flex items-center gap-2">
          <Barcode className="h-4 w-4 text-mted-foreground" />
          {item.memberCode}
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "บันทึกเมื่อ",
      render: (item: MemberCategory) => (
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-jade" />
          {formatDate(item.createdAt)}
        </div>
      ),
    },
    {
      key: "role",
      header: "ตำแหน่ง",
      render: (item: MemberCategory) => (
        <div className="flex items-center gap-2">
          <BriefcaseBusiness className="h-4 w-4 " />
          {item.role}
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <Loading />;
  }
  return (
    <DynamicTable
      data={members}
      columns={columns}
      error="ไม่พบข้อมูลสมาชิก"
      description="เริ่มต้นด้วยการสร้างบัญชีสมาชิกใหม่"
    />
  );
};
