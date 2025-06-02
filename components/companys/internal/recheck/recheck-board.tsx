"use client";

import { RecheckCard } from "@/components/companys/internal/recheck/recheck-card";
import { RefreshButton } from "@/components/shared/button/refresh-button";
import { TitleCard } from "@/components/shared/card/title-card";
import { useRefreshable } from "@/hooks";

export const RecheckBoard = () => {
  const { refreshKey, handleRefresh} = useRefreshable();

  return (
    <TitleCard
      title="คนไข้รีเช็ค / แบ่งชำระ"
      dialog={<RefreshButton onClick={handleRefresh} />}
    >
      <RecheckCard refreshKey={refreshKey}/>
    </TitleCard>
  );
};
