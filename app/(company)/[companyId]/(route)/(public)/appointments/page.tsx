import { ScheduleBoard } from "@/components/companys/internal/schedule/schedule-board";
import { RoleGate } from "@/components/props/wrapper/role-gate";
import { CompanyRole } from "@prisma/client";

const AppointmentPage = () => {
  return (
    <RoleGate
      allowedRole={[
        CompanyRole.MANAGER,
        CompanyRole.COMANAGER,
        CompanyRole.DENTIST,
        CompanyRole.ASSISTANT,
      ]}
    >
      <ScheduleBoard />
    </RoleGate>
  );
};

export default AppointmentPage;
