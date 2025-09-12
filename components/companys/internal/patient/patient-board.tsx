"use client";
import { DialogCreatePatient } from "@/components/dialog/internal/dialog-patient";
import { PatientTable } from "@/components/companys/internal/patient/patient-table";
import { NavigatingUi } from "@/components/props/component/navigating";
import { useNavigation, useRefreshable } from "@/hooks";
import { TitleCard } from "@/components/shared/card/title-card";
import { useCompany } from "@/context/context";
import { SearchBar } from "@/components/shared/pagination/search-bar";
import { useState } from "react";

export const PatientBoard = () => {
  const { companyId } = useCompany();
  const {refreshKey, handleRefresh } = useRefreshable();
  const { navigateTo, isNavigating } = useNavigation();

    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

  const handleRowClick = (patientId: string) => {
    navigateTo(`/${companyId}/patients/${patientId}`);
  };

  return (
    <TitleCard
      title="รายชื่อคนไข้ / บัตรคนไข้"
      dialog={<DialogCreatePatient onSuccess={handleRefresh} />}
    >
      <SearchBar
        value={searchValue}
        onChange={(val) => {
          setSearchValue(val);
          setCurrentPage(1);
        }}
        placeholder="ค้นหาชื่อหรือเบอร์โทร"
      />
      {isNavigating && <NavigatingUi />}
      <PatientTable
        refreshKey={refreshKey}
        handleRefresh={handleRefresh}
        onRowClick={handleRowClick}
        searchValue={searchValue}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </TitleCard>
  );
};
