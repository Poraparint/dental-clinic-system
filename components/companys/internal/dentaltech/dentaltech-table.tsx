"use client";

import { FormNotFound } from "@/components/form-not-found";
import { Loading } from "@/components/loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarDays,
  FolderKanban,
  Clock,
  UserCheck,
  CheckCircle2,
  Gauge,
  Timer,
  Flame,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useDentalTechs } from "@/hooks/internal/use-dentalTech";
import { formatDate } from "@/lib/utils";
import { useParams } from "next/navigation";

function renderStatusIcon(status: string) {
  switch (status) {
    case "รอดำเนินการ":
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case "รับงานเรียบร้อย":
      return <UserCheck className="w-4 h-4 text-blue-500" />;
    case "เสร็จสิ้น":
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    default:
      return null;
  }
}

function renderLevelIcon(level: string) {
  switch (level) {
    case "ปกติ":
      return <Gauge className="w-4 h-4 text-lapis-accent" />;
    case "เร่งด่วน":
      return <Timer className="w-4 h-4 text-orange-500" />;
    case "ด่วนมาก":
      return <Flame className="w-4 h-4 text-red-500" />;
    default:
      return null;
  }
}

export const DentalTechTable = () => {
  const params = useParams();
  const companyId = params.companyId as string;

  const { dentalTechs, isLoading } = useDentalTechs(companyId);

  if (isLoading) return <Loading />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.isArray(dentalTechs) ? (
        dentalTechs.map((dentaltech) => (
          <Card key={dentaltech.id} className="border rounded-2xl shadow-sm">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">
                  {dentaltech.patient.name}
                </CardTitle>
                <div className="flex items-center text-muted-foreground text-sm">
                  <CalendarDays className="w-4 h-4 mr-1" />
                  {formatDate(dentaltech.deadline)}
                </div>
              </div>
              <CardDescription className="flex items-center mt-1 text-sm">
                <FolderKanban className="w-4 h-4 mr-1 text-muted-foreground" />
                {dentaltech.dentalTechCategory.name}
              </CardDescription>
            </CardHeader>

            {dentaltech.detail && (
              <CardContent>
                <Textarea
                  value={dentaltech.detail}
                  readOnly
                  className="min-h-[80px]"
                />
              </CardContent>
            )}

            <CardFooter className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                {renderStatusIcon(dentaltech.status)}
                {dentaltech.status}
              </div>
              <div className="flex items-center gap-2">
                {renderLevelIcon(dentaltech.level)}
                {dentaltech.level}
              </div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <FormNotFound
          message={dentalTechs?.error}
          description={dentalTechs?.description}
        />
      )}
    </div>
  );
};
