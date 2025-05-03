import { PatientBoard } from "@/components/companys/internal/patient/patient-board";
import { RoleGate } from "@/components/props/wrapper/role-gate";
import { CompanyRole } from "@prisma/client";

const PatientBoardPage = () => {
  return (
    <RoleGate
      allowedRole={[
        CompanyRole.MANAGER,
        CompanyRole.COMANAGER,
        CompanyRole.DENTIST,
        CompanyRole.ASSISTANT,
      ]}
    >
      <PatientBoard />
    </RoleGate>
  );
};

export default PatientBoardPage;
