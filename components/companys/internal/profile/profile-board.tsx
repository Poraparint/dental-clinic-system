import { Card } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getBgRoleColor } from "@/lib/common/role-color";
import { User } from "lucide-react";
import { ScheduleBoard } from "@/components/companys/internal/schedule/schedule-board";
import { CompanyRole } from "@prisma/client";
import { RoleGate } from "@/components/props/wrapper/role-gate";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecoveryCard } from "@/components/companys/internal/profile/tabs/recovery-card";

export const ProfileBoard = async () => {
  const user = await currentUser();

  const userInfo = [
    {
      name: "ชื่อผู้ใช้",
      value: user.name,
    },
    {
      name: "บทบาท",
      value: user.role,
    },
    {
      name: "อีเมล",
      value: user.email,
    },
  ];

  const dentistId = user.role === CompanyRole.DENTIST ? user.id : undefined;

  return (
    <div className="space-y-2">
      <div className="flex flex-col md:grid grid-cols-3 grid-rows-1 gap-2">
        <Card className="flex flex-col md:flex-row items-center">
          <div className="">
            <div
              className={`rounded-full text-white size-10 justify-center items-center shadow-md flex ${getBgRoleColor(user.role)}`}
            >
              <User />
            </div>
          </div>

          <div className="w-full">
            {userInfo.map((info, index) => (
              <div
                key={`${info.name}-${index}`}
                className="flex justify-between items-center"
              >
                <div className="text-sm font-medium text-muted-foreground">
                  {info.name} :
                </div>
                <div>{info.value}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="col-span-2">{/* สรุป */}</Card>
      </div>
      <RoleGate allowedRole={[CompanyRole.DENTIST]} fallback={<div></div>}>
        <ScheduleBoard dentistId={dentistId} />
      </RoleGate>
      <RoleGate allowedRole={[CompanyRole.MANAGER]} fallback={<div></div>}>
        <Tabs defaultValue="recovery-data">
          <TabsList className="w-fit mb-6">
            <TabsTrigger value="recovery-data">ข้อมูลที่ถูกลบ</TabsTrigger>
          </TabsList>
          <>
            <RecoveryCard/>
          </>
        </Tabs>
      </RoleGate>
    </div>
  );
};
