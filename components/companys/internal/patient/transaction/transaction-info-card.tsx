"use client";

import { DialogCreateTransaction } from "@/components/dialog/internal/dialog-transaction";
import { TabsContent } from "@/components/ui/tabs";
import { TransactionTable } from "@/components/companys/internal/patient/transaction/transaction-table";
import { useRefreshable } from "@/hooks";

export const TransactionInfoCard = () => {
  const { refreshKey, handleRefresh } = useRefreshable();

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

        <TransactionTable refreshKey={refreshKey} handleRefresh={ handleRefresh } />
      </TabsContent>
    </>
  );
};
