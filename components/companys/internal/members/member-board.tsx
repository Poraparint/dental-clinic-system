"use client";
import { useState } from "react";
import { MemberTable } from "@/components/companys/internal/members/member-table";
import { DialogCreateMember } from "@/components/dialog/internal/dialog-create-member";
import { Card } from "@/components/ui/card";

export const MemberBoard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
   
      <Card className="px-5">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">รายชื่อสมาชิก / จัดการพนักงาน</h1>
          <DialogCreateMember onSuccess={handleRefresh} />
        </div>
        <hr />
        <MemberTable key={refreshKey} />
      </Card>
   
  );
};
