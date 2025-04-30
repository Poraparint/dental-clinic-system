"use client";
import { TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { DentalTechCategoriesTable } from "@/components/companys/internal/settings/category/dtc/dentaltech-category-table";
import { DialogCreateDentalTechCategory } from "@/components/dialog/internal/category/dialog-create-dtc";

export const DentalTechCategoryBoard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <TabsContent value="dental-items" className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">
          หมวดหมู่ทันตกรรม / รายการทันตกรรม
        </h1>
        <DialogCreateDentalTechCategory onSuccess={handleRefresh} />
      </div>
      <hr />
      <DentalTechCategoriesTable key={refreshKey} />
    </TabsContent>
  );
};
