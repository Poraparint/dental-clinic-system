"use client";
import { useState } from "react";
import { MemberTable } from "@/components/companys/internal/members/member-table";
import { DialogCreateMember } from "@/components/dialog/internal/dialog-create-member";
import { RoleGate } from "@/components/props/role-gate";
import { CompanyRole } from "@prisma/client";

export const MemberBoard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <RoleGate allowedRole={[CompanyRole.MANAGER, CompanyRole.COMANAGER]}>
      <div className="space-y-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">รายชื่อสมาชิก / จัดการพนักงาน</h1>
          <DialogCreateMember onSuccess={handleRefresh} />
        </div>
        <hr />
        <MemberTable key={refreshKey} />
      </div>
    </RoleGate>
  );
};
