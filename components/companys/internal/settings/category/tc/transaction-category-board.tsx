"use client";
import { TabsContent } from "@/components/ui/tabs";
import { TransactionCategoriesTable } from "@/components/companys/internal/settings/category/tc/transaction-category-table";
import { DialogCreateTransactionCategory } from "@/components/dialog/internal/category/dialog-tc";
import { useRefreshable } from "@/hooks";

export const TransactionCategoryBoard = () => {
  const { refreshKey, handleRefresh} = useRefreshable();

  return (
    <TabsContent value="dental-procedures" className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">หมวดหมู่ทำฟัน / รายการทำฟัน</h1>
        <DialogCreateTransactionCategory onSuccess={handleRefresh} />
      </div>
      <hr />
      <TransactionCategoriesTable refreshKey={refreshKey} handleRefresh={handleRefresh}/>
    </TabsContent>
  );
};
