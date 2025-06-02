"use client";
import { TabsContent } from "@/components/ui/tabs";
import { ExpensesCategoriesTable } from "@/components/companys/internal/settings/category/ec/expenses-category-table";
import { DialogCreateExpensesCategory } from "@/components/dialog/internal/category/dialog-ec";
import { useRefreshable } from "@/hooks";

export const ExpensesCategoryBoard = () => {
  const { refreshKey, handleRefresh } = useRefreshable();

  return (
    <TabsContent value="expense-types" className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">
          หมวดหมู่ค่าใช้จ่าย / รายการค่าใช้จ่าย
        </h1>
        <DialogCreateExpensesCategory onSuccess={handleRefresh} />
      </div>
      <hr />
      <ExpensesCategoriesTable
        refreshKey={refreshKey}
        handleRefresh={handleRefresh}
      />
    </TabsContent>
  );
};
