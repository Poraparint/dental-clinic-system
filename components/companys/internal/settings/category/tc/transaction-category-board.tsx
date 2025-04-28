"use client";
import { TabsContent } from "@/components/ui/tabs";
import { TransactionCategoriesTable } from "@/components/companys/internal/settings/category/tc/transaction-category-table";
import { useState } from "react";
import { DialogCreateTransactionCategory } from "@/components/dialog/internal/category/dialog-create-tc";

export const TransactionCategoryBoard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <TabsContent value="dental-procedures" className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">หมวดหมู่ทำฟัน / รายการทำฟัน</h1>
        <DialogCreateTransactionCategory onSuccess={handleRefresh} />
      </div>
      <hr />
      <TransactionCategoriesTable key={refreshKey} />
    </TabsContent>
  );
};
