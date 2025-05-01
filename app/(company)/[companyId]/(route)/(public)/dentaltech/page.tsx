import { DentalTechBoard } from "@/components/companys/internal/dentaltech/dentaltech-board";
import { RoleGate } from "@/components/props/role-gate";
import { CompanyRole } from "@prisma/client";

const DentalTechPage = () => {
  return (
    <RoleGate
      allowedRole={[CompanyRole.MANAGER, CompanyRole.DENTALTECHNICIAN]}
    >
      <DentalTechBoard />
    </RoleGate>
  );
};

export default DentalTechPage;
