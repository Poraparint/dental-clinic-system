"use client";
import { PatientInfoCard } from "@/components/companys/internal/patient/patient-info-card";
import { TransactionInfoCard } from "@/components/companys/internal/patient/transaction/transaction-info-card";
import { FormNotFound } from "@/components/form-not-found";
import { Loading } from "@/components/loading";
import { RoleGate } from "@/components/props/wrapper/role-gate";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCompany } from "@/context/context";
import { PatientProvider } from "@/context/provider";
import { usePatient } from "@/hooks/internal/company/use-patient";
import { CompanyRole } from "@prisma/client";
import { useParams } from "next/navigation";

const PatientInfoCardPage = () => {
  const { companyId } = useCompany();
  const params = useParams();

  const patientId = params.patientId as string;

  const { patient, error, isLoading } = usePatient(companyId, patientId);

  if (isLoading) return <Loading />;

  if (error || !patient) return <FormNotFound />;

  return (
    <PatientProvider patientId={patientId}>
      <RoleGate
        allowedRole={[
          CompanyRole.MANAGER,
          CompanyRole.COMANAGER,
          CompanyRole.DENTIST,
          CompanyRole.ASSISTANT,
        ]}
      >
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
                {patient.age && (
                  <p className="text-foreground/80">• อายุ: {patient.age} ปี</p>
                )}
              </div>
            </div>

            <PatientInfoCard patient={patient} />

            <TransactionInfoCard />
          </Tabs>
        </Card>
      </RoleGate>
    </PatientProvider>
  );
};

export default PatientInfoCardPage;
