"use client";
import { DialogCreatePatient } from "@/components/dialog/internal/dialog-patient";
import { PatientTable } from "@/components/companys/internal/patient/patient-table";
import { useState } from "react";
import { NavigatingUi } from "@/components/props/component/navigating";
import { useNavigation } from "@/hooks/use-navigation";
import { TitleCard } from "@/components/shared/card/title-card";
import { useCompany } from "@/context/context";

export const PatientBoard = () => {
  const { companyId } = useCompany();
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
      <PatientTable
        key={refreshKey}
        refreshKey={refreshKey}
        onRefresh={handleRefresh}
        onRowClick={handleRowClick}
      />
    </TitleCard>
  );
};
