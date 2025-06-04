"use client";
import { MemberTable } from "@/components/companys/internal/members/member-table";
import { DialogCreateMember } from "@/components/dialog/internal/dialog-create-member";
import { TitleCard } from "@/components/shared/card/title-card";
import { useRefreshable } from "@/hooks";

export const MemberBoard = () => {
  const {refreshKey, handleRefresh } = useRefreshable();

  return (
    <TitleCard
      title="รายชื่อสมาชิก / จัดการพนักงาน"
      dialog={<DialogCreateMember onSuccess={handleRefresh} />}
    >
      <MemberTable refreshKey={refreshKey} handleRefresh={ handleRefresh } />
    </TitleCard>
  );
};
