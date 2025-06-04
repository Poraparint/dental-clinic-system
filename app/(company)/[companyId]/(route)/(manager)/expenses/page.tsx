import { Expenses } from "@/components/companys/internal/expenses/expenses-board";
import { RoleGate } from "@/components/props/wrapper/role-gate";
import { CompanyRole } from "@prisma/client";

const ExpensesPage = () => {
  return (
    <RoleGate allowedRole={[CompanyRole.MANAGER]}>
      <Expenses />
    </RoleGate>
  );
};

export default ExpensesPage;
