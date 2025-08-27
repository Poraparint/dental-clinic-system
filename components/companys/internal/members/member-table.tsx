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
import { softDeleteMember, updateRoleMember, useMembers } from "@/hooks";
import { formatDate } from "@/lib/utils";
import { Member, RefreshableProps } from "@/types";
import { useCompany } from "@/context/context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CompanyRole } from "@prisma/client";
import { toast } from "sonner";
import { getTextRoleColor } from "@/lib/common/role-color";

export const MemberTable = ({
  refreshKey,
  handleRefresh,
}: RefreshableProps) => {
  const { companyId } = useCompany();
  const { members, error, isLoading } = useMembers(companyId, refreshKey);

  const updateRole = async (memberId: string, role: CompanyRole) => {
    const response = await updateRoleMember(companyId, memberId, role);
    if (response.error) {
      toast.error(response.error, { description: response.description });
    } else {
      toast.success(response.success);
      handleRefresh?.()
    };
  };

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
          <Select
            value={item.role}
            onValueChange={(role) => updateRole(item.id, role as CompanyRole)}
          >
            <SelectTrigger className="h-8 w-[140px]">
              <BriefcaseBusiness className={`size-4 ${getTextRoleColor(item.role)}`} />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(CompanyRole)
                .filter((role) => role !== CompanyRole.MANAGER)
                .map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
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
      onSoftDelete={(item) => softDeleteMember(companyId, item.id)}
      onDeleteResult={({ success, error, description }) => {
        if (success) {
          toast.success(success);
          handleRefresh?.();
        } else {
          toast.error(error, {
            description,
          });
        }
      }}
      error={error?.error}
      description={error?.description}
    />
  );
};
