"use client";
import { TabsContent } from "@/components/ui/tabs";
import { DentalTechCategoriesTable } from "@/components/companys/internal/settings/category/dtc/dentaltech-category-table";
import { DialogCreateDentalTechCategory } from "@/components/dialog/internal/category/dialog-dtc";
import { useRefreshable } from "@/hooks";

export const DentalTechCategoryBoard = () => {
  const { refreshKey, handleRefresh } = useRefreshable();

  return (
    <TabsContent value="dental-items" className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">
          หมวดหมู่ทันตกรรม / รายการทันตกรรม
        </h1>
        <DialogCreateDentalTechCategory onSuccess={handleRefresh} />
      </div>
      <hr />
      <DentalTechCategoriesTable
        refreshKey={refreshKey}
        handleRefresh={handleRefresh}
      />
    </TabsContent>
  );
};
