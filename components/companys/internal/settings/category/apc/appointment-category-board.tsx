"use client";
import { TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { DialogCreateAppointmentCategory } from "@/components/dialog/internal/dialog-create-apc";
import { AppointmentCategoriesTable } from "./appointment-category-table";

export const AppointmentCategoryBoard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <TabsContent value="scheduling" className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">
          จัดการเวลานัด / เวลาตารางนัด
        </h1>
        <DialogCreateAppointmentCategory onSuccess={handleRefresh} />
      </div>
      <hr />
      <AppointmentCategoriesTable key={refreshKey} />
    </TabsContent>
  );
};
