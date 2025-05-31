"use client";

import { RecheckCard } from "@/components/companys/internal/recheck/recheck-card";
import { useState } from "react";
import { RefreshButton } from "@/components/shared/button/refresh-button";
import { TitleCard } from "@/components/shared/card/title-card";

export const RecheckBoard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <TitleCard
      title="คนไข้รีเช็ค / แบ่งชำระ"
      dialog={<RefreshButton onClick={handleRefresh} />}
    >
      <RecheckCard key={refreshKey} />
    </TitleCard>
  );
};
