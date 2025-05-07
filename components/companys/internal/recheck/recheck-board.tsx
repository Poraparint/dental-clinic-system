"use client";
import { DialogCreateRecheck } from "@/components/dialog/internal/dialog-create-recheck";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { RecheckCard } from "./recheck-card";

export const RecheckBoard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };
  return (
    <Card className="px-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">คนไข้รีเช็ค / แบ่งชำระ</h1>
        <DialogCreateRecheck onSuccess={handleRefresh} />
      </div>
      <hr />
      <RecheckCard key={refreshKey}/>
    </Card>
  );
};
