"use client";
import { TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { DialogCreateTransactionCategory } from "@/components/dialog/internal/dialog-create-tc";
import { DentalTechCategoriesTable } from "./tc-table";

export const DentalTechCategoryBoard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <TabsContent value="dental-items" className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">หมวดหมู่ทันตกรรม / รายการทันตกรรม</h1>
        <DialogCreateTransactionCategory onSuccess={handleRefresh} />
      </div>
      <hr />
      <DentalTechCategoriesTable key={refreshKey} />
    </TabsContent>
  );
};
