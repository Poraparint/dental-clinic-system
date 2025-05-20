"use client";
import { TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { DialogCreateAppointmentCategory } from "@/components/dialog/internal/category/dialog-create-apc";
import { AppointmentCategoriesTable } from "./schedule-category-table";

export const AppointmentCategoryBoard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <TabsContent value="scheduling" className="space-y-4">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">จัดการเวลานัด / เวลาตารางนัด</h1>
          <p className="text-sm text-muted-foreground">
            ลากรายการเพื่อจัดเรียงลำดับรายการได้
          </p>
        </div>

        <DialogCreateAppointmentCategory onSuccess={handleRefresh} />
      </div>
      <hr />
      <AppointmentCategoriesTable key={refreshKey} />
    </TabsContent>
  );
};
