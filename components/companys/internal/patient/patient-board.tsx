"use client";
import { DialogCreatePatient } from "@/components/dialog/internal/dialog-patient";
import { PatientTable } from "@/components/companys/internal/patient/patient-table";
import { NavigatingUi } from "@/components/props/component/navigating";
import { useNavigation, useRefreshable } from "@/hooks";
import { TitleCard } from "@/components/shared/card/title-card";
import { useCompany } from "@/context/context";

export const PatientBoard = () => {
  const { companyId } = useCompany();
  const {refreshKey, handleRefresh } = useRefreshable();
  const { navigateTo, isNavigating } = useNavigation();

  const handleRowClick = (patientId: string) => {
    navigateTo(`/${companyId}/patients/${patientId}`);
  };

  return (
    <TitleCard
      title="รายชื่อคนไข้ / บัตรคนไข้"
      dialog={<DialogCreatePatient onSuccess={handleRefresh} />}
    >
      {isNavigating && <NavigatingUi />}
      <PatientTable
        refreshKey={refreshKey}
        handleRefresh={handleRefresh}
        onRowClick={handleRowClick}
      />
    </TitleCard>
  );
};
