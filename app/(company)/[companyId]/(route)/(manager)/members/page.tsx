import { MemberBoard } from "@/components/companys/internal/members/member-board";
import { RoleGate } from "@/components/props/wrapper/role-gate";
import { CompanyRole } from "@prisma/client";

const MemberManagementPage = () => {
  return (
    <RoleGate allowedRole={[CompanyRole.MANAGER, CompanyRole.COMANAGER]}>
      <MemberBoard />
    </RoleGate>
  );
};

export default MemberManagementPage;
