import { CardCategory } from "@/components/props/card-category";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Pill, UserRound } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age?: string | null;
  phone?: string | null;
  address?: string | null;
  work?: string | null;
  worktel?: string | null;
  cd?: string | null;
  drug?: string | null;
}

interface PatientInfoCardProps {
  patient: Patient;
}

export const PatientInfoCard = ({ patient }: PatientInfoCardProps) => {
  return (
    <>
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

      <TabsContent value="info">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardCategory icon={<UserRound />} title="ข้อมูลการติดต่อ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <CardDescription>ที่อยู่</CardDescription>
                <CardTitle>{patient.address}</CardTitle>
              </div>
              <div className="space-y-2">
                <CardDescription>เบอร์โทรศัพท์</CardDescription>
                <CardTitle>{patient.phone}</CardTitle>
              </div>
              <div className="space-y-2">
                <CardDescription>ที่อยู่ที่ทำงาน</CardDescription>
                <CardTitle>{patient.work}</CardTitle>
              </div>
              <div className="space-y-2">
                <CardDescription>เบอร์โทรที่ทำงาน</CardDescription>
                <CardTitle>{patient.worktel}</CardTitle>
              </div>
            </div>
          </CardCategory>

          <CardCategory icon={<Pill />} title="ข้อมูลทางการแพทย์">
            <div className="space-y-4">
              <div className="space-y-2">
                <CardDescription>โรคประจำตัว</CardDescription>
                <CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-amber-100 text-amber-800 border-amber-200"
                  >
                    {patient.cd}
                  </Badge>
                </CardTitle>
              </div>
              <div className="space-y-2">
                <CardDescription>แพ้ยา</CardDescription>
                <CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-destructive text-destructive-foreground border-destructive-foreground"
                  >
                    {patient.drug}
                  </Badge>
                </CardTitle>
              </div>
            </div>
          </CardCategory>
        </div>
      </TabsContent>
    </>
  );
};
