"use client";

import { FormNotFound } from "@/components/form-not-found";
import { Loading } from "@/components/loading";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays, BriefcaseBusiness, User } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useDentalTechs } from "@/hooks/internal/use-dentalTech";
import { formatDate } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  renderLevelIcon,
  renderStatusIcon,
} from "@/components/props/render/render-icons";
import { FilterBar } from "@/components/props/component/filter-bar";

export const DentalTechTable = () => {
  const params = useParams();
  const companyId = params.companyId as string;

  const { dentalTechs, isLoading } = useDentalTechs(companyId);

  const [selectedStatus, setSelectedStatus] = useState("ทั้งหมด");
  const [selectedLevel, setSelectedLevel] = useState("ทั้งหมด");

  const filtered = Array.isArray(dentalTechs)
    ? dentalTechs.filter((tech) => {
        const matchStatus =
          selectedStatus === "ทั้งหมด" || tech.status === selectedStatus;
        const matchLevel =
          selectedLevel === "ทั้งหมด" || tech.level === selectedLevel;
        return matchStatus && matchLevel;
      })
    : [];

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-4">
      <FilterBar
        onStatusChange={setSelectedStatus}
        onLevelChange={setSelectedLevel}
      />
      <div className="grid xl:grid-cols-2 gap-3">
        {filtered.length > 0 ? (
          filtered.map((dentaltech) => (
            <Card key={dentaltech.id} className="md:flex-row justify-between">
              <CardHeader className="w-full">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <BriefcaseBusiness className="size-4 text-muted-foreground" />
                    {dentaltech.dentalTechCategory.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <User className="size-4 text-jade" />
                    {dentaltech.patient.name}
                  </CardDescription>
                </div>

                {dentaltech.detail && (
                  <>
                    <div className="w-24 h-[2px] bg-muted-foreground mb-2 rounded-md" />
                    <CardDescription>รายละเอียด :</CardDescription>
                    <Textarea value={dentaltech.detail} readOnly />
                  </>
                )}
              </CardHeader>

              <CardFooter className="flex flex-col justify-between gap-4 w-full md:items-end">
                <CardDescription className="flex items-center gap-2">
                  <CalendarDays className="size-4" />
                  กำหนดรับงาน :
                  <span className="text-base">
                    {formatDate(dentaltech.deadline)}
                  </span>
                </CardDescription>
                <CardDescription className="flex gap-4">
                  <div className="flex items-center gap-2">
                    {renderLevelIcon(dentaltech.level)}
                    {dentaltech.level}
                  </div>
                  <div className="flex items-center gap-2">
                    {renderStatusIcon(dentaltech.status)}
                    {dentaltech.status}
                  </div>
                </CardDescription>
              </CardFooter>
            </Card>
          ))
        ) : (
          <FormNotFound
            message="ไม่พบข้อมูลตามที่เลือก"
            description="กรุณาเปลี่ยนตัวกรองเพื่อดูข้อมูล"
          />
        )}
      </div>
    </div>
  );
};
