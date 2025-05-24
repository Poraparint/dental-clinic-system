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
import { DynamicTable } from "@/components/props/component/dynamic-table";
import { useMembers } from "@/hooks/internal/company/use-member";
import { useParams } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { Member } from "@/types/member";

export const MemberTable = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const { members, error, isLoading } = useMembers(companyId);

  const columns = [
    {
      key: "name",
      header: "ชื่อพนักงาน",
      render: (item: Member) => (
        <div className="flex items-center gap-2">
          <User className="size-4 text-lapis-text" />
          {item.user.name}
        </div>
      ),
    },
    {
      key: "phone",
      header: "เบอร์ติดต่อ",
      render: (item: Member) => (
        <div className="flex items-center gap-2">
          <Phone className="size-4 text-jade" />
          {item.user.phone}
        </div>
      ),
    },
    {
      key: "email",
      header: "อีเมล",
      render: (item: Member) => (
        <div className="flex items-center gap-2">
          <Mail className="size-4 text-amber-text" />
          {item.user.email}
        </div>
      ),
    },
    {
      key: "isTwoFactorEnabled",
      header: "2FA",
      render: (item: Member) => (
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-blue-500" />
          {item.user.isTwoFactorEnabled ? "ON" : "OFF"}
        </div>
      ),
    },
    {
      key: "memberCode",
      header: "รหัสพนักงาน",
      render: (item: Member) => (
        <div className="flex items-center gap-2">
          <Barcode className="size-4 text-muted-foreground" />
          {item.memberCode}
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "บันทึกเมื่อ",
      render: (item: Member) => (
        <div className="flex items-center gap-2">
          <CalendarDays className="size-4" />
          {formatDate(item.createdAt)}
        </div>
      ),
    },
    {
      key: "role",
      header: "ตำแหน่ง",
      render: (item: Member) => (
        <div className="flex items-center gap-2">
          <BriefcaseBusiness className="size-4" />
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
      error={error?.error}
      description={error?.description}
    />
  );
};
