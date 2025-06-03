"use client";
import { TabsContent } from "@/components/ui/tabs";
import { AddOnCategoriesTable } from "@/components/companys/internal/settings/category/add-on/addon-category-table";
import { useRefreshable } from "@/hooks";
import { DialogCreateAddOnCategory } from "@/components/dialog/internal/category/dialog-add-on";

export const AddOnCategoryBoard = () => {
  const { refreshKey, handleRefresh } = useRefreshable();

  return (
    <TabsContent value="addon-items" className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">
          หมวดหมู่สินค้าเสริม / รายการสินค้าเสริม
        </h1>
        <DialogCreateAddOnCategory onSuccess={handleRefresh} />
      </div>
      <hr />
      <AddOnCategoriesTable
        refreshKey={refreshKey}
        handleRefresh={handleRefresh}
      />
    </TabsContent>
  );
};
