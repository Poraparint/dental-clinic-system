import { CompanyCard } from "@/components/companys/external/company-card";
import { DialogCreateMinistry } from "@/components/dialog/external/dialog-create-ministry";

export const Ministry = async () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Ministry Dashboard</h1>

        <DialogCreateMinistry />
      </div>
      <hr />

      <CompanyCard />
    </div>
  );
};
