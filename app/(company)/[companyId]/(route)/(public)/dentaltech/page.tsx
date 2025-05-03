import { DentalTechBoard } from "@/components/companys/internal/dentaltech/dentaltech-board";
import { RoleGate } from "@/components/props/wrapper/role-gate";
import { CompanyRole } from "@prisma/client";

const DentalTechPage = () => {
  return (
    <RoleGate
      allowedRole={[
        CompanyRole.MANAGER,
        CompanyRole.COMANAGER,
        CompanyRole.DENTALTECHNICIAN,
        CompanyRole.DENTIST,
      ]}
    >
      <DentalTechBoard />
    </RoleGate>
  );
};

export default DentalTechPage;
