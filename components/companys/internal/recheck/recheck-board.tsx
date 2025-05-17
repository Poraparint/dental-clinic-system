"use client";
import { Card } from "@/components/ui/card";
import { RecheckCard } from "@/components/companys/internal/recheck/recheck-card";
import { useState } from "react";
import { RefreshButton } from "@/components/props/component/button/refresh-button";

export const RecheckBoard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <Card className="px-5 sapce-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">คนไข้รีเช็ค / แบ่งชำระ</h1>
        <RefreshButton onClick={handleRefresh} />
      </div>

      <hr />
      <RecheckCard key={refreshKey} />
    </Card>
  );
};
