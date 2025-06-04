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
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

  const handleRowClick = (patientId: string) => {
    navigateTo(`/${companyId}/patients/${patientId}`);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <TitleCard
      title="รายชื่อคนไข้ / บัตรคนไข้"
      dialog={<DialogCreatePatient onSuccess={handleRefresh} />}
      
    >
      <SearchBar
        value={search}
        onChange={handleSearchChange}
        placeholder="ค้นหาชื่อหรือเบอร์โทร"
      />
      {isNavigating && <NavigatingUi />}
      <PatientTable
        refreshKey={refreshKey}
        handleRefresh={handleRefresh}
        onRowClick={handleRowClick}
        search={search}
        page={page}
        setPage={setPage}
      />
    </TitleCard>
  );
};
