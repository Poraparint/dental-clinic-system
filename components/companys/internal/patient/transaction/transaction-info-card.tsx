"use client";

import { DialogCreateTransaction } from "@/components/dialog/internal/dialog-create-transaction";
import { TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { TransactionTable } from "@/components/companys/internal/patient/transaction/transaction-table";

export const TransactionInfoCard = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <TabsContent value="transactions" className="space-y-4">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              ประวัติการรักษา / รายการธุรกรรม
            </h1>
            <p className="text-muted-foreground">
              รายการธุรกรรมทั้งหมดของคนไข้
            </p>
          </div>

          <DialogCreateTransaction onSuccess={handleRefresh} />
        </div>

        <TransactionTable key={refreshKey} />
      </TabsContent>
    </>
  );
};
