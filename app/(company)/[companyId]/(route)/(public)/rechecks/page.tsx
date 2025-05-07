import { RecheckBoard } from "@/components/companys/internal/recheck/recheck-board";
import { RoleGate } from "@/components/props/wrapper/role-gate";
import { CompanyRole } from "@prisma/client";

const RecheckPage = () => {
    return (
      <RoleGate allowedRole={[CompanyRole.MANAGER, CompanyRole.COMANAGER, CompanyRole.DENTIST, CompanyRole.ASSISTANT]}>
        <RecheckBoard />
      </RoleGate>
    );
}
 
export default RecheckPage;