"use client";
import { CompanyCard } from "@/components/companys/external/company-card";
import { DialogCreateMinistry } from "@/components/dialog/external/dialog-create-ministry";
import { useRefreshable } from "@/hooks";

const MinistryPage = () => {
  const {refreshKey, handleRefresh } = useRefreshable();

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Ministry Dashboard</h1>

        <DialogCreateMinistry onSuccess={handleRefresh} />
      </div>
      <hr />

      <CompanyCard refreshKey={refreshKey} />
    </div>
  );
};

export default MinistryPage;
