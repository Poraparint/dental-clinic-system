"use client";
import { DialogCreatePatient } from "@/components/dialog/internal/dialog-create-patient";

import { useParams } from "next/navigation";
import { PatientTable } from "@/components/companys/internal/patient/patient-table";
import { useState } from "react";
import { NavigatingUi } from "@/components/props/component/navigating";
import { useNavigation } from "@/hooks/use-navigation";
import { TitleCard } from "@/components/shared/card/title-card";

export const PatientBoard = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const [refreshKey, setRefreshKey] = useState(0);
  const { navigateTo, isNavigating } = useNavigation();

  const handleRowClick = (patientId: string) => {
    navigateTo(`/${companyId}/patients/${patientId}`);
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <TitleCard
      title="รายชื่อคนไข้ / บัตรคนไข้"
      dialog={<DialogCreatePatient onSuccess={handleRefresh} />}
    >
      {isNavigating && <NavigatingUi />}
      <PatientTable key={refreshKey} onRowClick={handleRowClick} />
    </TitleCard>
  );
};
