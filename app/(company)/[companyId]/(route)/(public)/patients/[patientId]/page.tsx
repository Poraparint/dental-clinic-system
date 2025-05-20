import { PatientInfoCard } from "@/components/companys/internal/patient/patient-info-card";
import { TransactionInfoCard } from "@/components/companys/internal/patient/transaction/transaction-info-card";
import { RoleGate } from "@/components/props/wrapper/role-gate";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPatientByCompanyId } from "@/data/internal/patient";
import { currentManagerAndDentist } from "@/lib/auth";
import { CompanyRole } from "@prisma/client";
import { notFound } from "next/navigation";

type PatientInfoCardPageProps = {
  params: Promise<{ patientId: string; companyId: string }>;
};

const PatientInfoCardPage = async ({ params }: PatientInfoCardPageProps) => {
  const { companyId, patientId } = await params;

  const existingUser = await currentManagerAndDentist();

  if (!existingUser) {
    notFound();
  }

  const patient = await getPatientByCompanyId(companyId, patientId);

  if (!patient) {
    notFound();
  }

  return (
    <RoleGate allowedRole={[CompanyRole.MANAGER, CompanyRole.COMANAGER, CompanyRole.DENTIST, CompanyRole.ASSISTANT]}>
      <Card className="tracking-wide px-5">
        <Tabs defaultValue="info" className="space-y-4">
          <TabsList>
            <TabsTrigger value="info">ข้อมูลส่วนตัว</TabsTrigger>
            <TabsTrigger value="transactions">ประวัติการรักษา</TabsTrigger>
          </TabsList>
          <div className="flex items-center mb-6">
            <Avatar className="h-16 w-16 mr-4">
              <AvatarFallback className="text-lg">
                {patient.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{patient.name}</h1>
              <p className="text-foreground/80">• อายุ: {patient.age} ปี</p>
            </div>
          </div>

          <PatientInfoCard patient={patient} />
          <RoleGate
            allowedRole={[
              CompanyRole.MANAGER,
              CompanyRole.COMANAGER,
              CompanyRole.DENTIST,
            ]}
          >
            <TransactionInfoCard />
          </RoleGate>
        </Tabs>
      </Card>
    </RoleGate>
  );
};

export default PatientInfoCardPage;
