import { PatientInfoCard } from "@/components/companys/internal/patient/patient-info-card";
import { Loading } from "@/components/loading";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPatientByCompanyId } from "@/data/patient";
import { notFound } from "next/navigation";
import { Suspense } from "react";


type PatientInfoCardPageProps = {
    params: { patientId: string, companyId: string };
}

const PatientInfoCardPage = async ({ params }: PatientInfoCardPageProps) => {
    
    const { companyId, patientId } = params;

    console.log("companyId", companyId);
    console.log("patientId", patientId);

    const patient = await getPatientByCompanyId(patientId, companyId);

    console.log(patient);

    if (!patient) {
        notFound()
    }
    
    return (
      <div className="container tracking-wide">
        <Tabs defaultValue="info" className="space-y-4">
          <TabsList>
            <TabsTrigger value="info">ข้อมูลส่วนตัว</TabsTrigger>
            <TabsTrigger value="transactions">ประวัติการรักษา</TabsTrigger>
          </TabsList>

          <Suspense fallback={<Loading />}>
            <PatientInfoCard patient={patient} />
            
          </Suspense>
        </Tabs>
      </div>
    );
}
 
export default PatientInfoCardPage;