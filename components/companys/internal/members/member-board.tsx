"use client";
import { useState } from "react";
import { MemberTable } from "@/components/companys/internal/members/member-table";
import { DialogCreateMember } from "@/components/dialog/internal/dialog-create-member";
import { TitleCard } from "@/components/shared/card/title-card";

export const MemberBoard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <TitleCard
      title="รายชื่อสมาชิก / จัดการพนักงาน"
      dialog={<DialogCreateMember onSuccess={handleRefresh} />}
    >
      <MemberTable key={refreshKey} />
    </TitleCard>
  );
};
