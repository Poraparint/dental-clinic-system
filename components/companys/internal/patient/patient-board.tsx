"use client";
import { DialogCreatePatient } from "@/components/dialog/internal/dialog-create-patient";

import { useParams, useRouter } from "next/navigation";
import { PatientTable } from "@/components/companys/internal/patient/patient-table";
import { useState } from "react";
import { Card } from "@/components/ui/card";

export const PatientBoard = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRowClick = (patientId: string) => {
    router.push(`/${companyId}/patients/${patientId}`);
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    
      <Card className="px-5">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">รายชื่อคนไข้ / บัตรคนไข้</h1>
          <DialogCreatePatient onSuccess={handleRefresh} />
        </div>
        <hr />
        <PatientTable key={refreshKey} onRowClick={handleRowClick} />
      </Card>
   
  );
};
