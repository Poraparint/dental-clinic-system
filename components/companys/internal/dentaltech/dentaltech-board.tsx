"use client";
import { useState } from "react";
import { RoleGate } from "@/components/props/wrapper/role-gate";
import { CompanyRole } from "@prisma/client";
import { DialogCreateDentalTech } from "@/components/dialog/internal/dialog-create-dentaltech";
import { DentalTechTable } from "@/components/companys/internal/dentaltech/dentaltech-table";
import { Card } from "@/components/ui/card";

export const DentalTechBoard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <Card className="px-5">
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold">
          รายการงานทันตกรรม / จัดการงานทันตกรรม
        </h1>
        <RoleGate
          allowedRole={[
            CompanyRole.MANAGER,
            CompanyRole.COMANAGER,
            CompanyRole.DENTIST,
          ]}
          fallback={<></>}
        >
          <DialogCreateDentalTech onSuccess={handleRefresh} />
        </RoleGate>
      </div>
      <hr />

      <DentalTechTable key={refreshKey} />
    </Card>
  );
};
