import { FinancialReport } from "@/components/companys/internal/financial-report/financial-board";
import { RoleGate } from "@/components/props/wrapper/role-gate";
import { CompanyRole } from "@prisma/client";

const FinancialReportPage = () => {
    return (
        <RoleGate allowedRole={[CompanyRole.MANAGER]}>
<FinancialReport/>
        </RoleGate>
     );
}
 
export default FinancialReportPage;