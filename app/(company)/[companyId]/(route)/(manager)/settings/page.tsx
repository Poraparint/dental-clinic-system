import { Settings } from "@/components/companys/internal/settings/settings";
import { RoleGate } from "@/components/props/wrapper/role-gate";
import { CompanyRole } from "@prisma/client";

const SettingsPage = async () => {
  return (
    <RoleGate
      allowedRole={[
        CompanyRole.MANAGER,
        CompanyRole.COMANAGER,
        CompanyRole.DENTALTECHNICIAN,
      ]}
    >
      <Settings />
    </RoleGate>
  );
};

export default SettingsPage;
