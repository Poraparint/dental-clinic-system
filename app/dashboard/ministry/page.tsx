"use client";
import { CompanyCard } from "@/components/companys/external/company-card";
import { DialogCreateMinistry } from "@/components/dialog/external/dialog-create-ministry";
import { useState } from "react";

const MinistryPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

    return (
      <div className="space-y-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Ministry Dashboard</h1>

          <DialogCreateMinistry onSuccess={handleRefresh} />
        </div>
        <hr />

        <CompanyCard key={refreshKey} />
      </div>
    );
}
 
export default MinistryPage;