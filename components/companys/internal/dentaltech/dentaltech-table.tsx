"use client";

import { FormNotFound } from "@/components/form-not-found";
import { Loading } from "@/components/loading";
import { useDentalTechs } from "@/hooks/internal/use-dentalTech";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  renderLevelIcon,
  renderStatusIcon,
} from "@/components/props/render/render-icons";
import { FilterBar } from "@/components/props/component/filter-bar";
import { DentalTechCard } from "@/components/props/component/dentaltech-card";

export const DentalTechTable = () => {
  const params = useParams();
  const companyId = params.companyId as string;

  const { dentalTechs, error, isLoading } = useDentalTechs(companyId);

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

  if (error) {
    return (
      <FormNotFound message={error?.error} description={error?.description} />
    );
  }

  return (
    <div className="space-y-4">
      <FilterBar
        onStatusChange={setSelectedStatus}
        onLevelChange={setSelectedLevel}
      />
      <div className="grid xl:grid-cols-2 gap-3">
        {
          filtered.map((dentaltech) => (
            <DentalTechCard
              key={dentaltech.id}
              avatar={dentaltech.patient.name.charAt(0)}
              name={dentaltech.patient.name}
              phone={dentaltech.patient.phone}
              levelIcon={renderLevelIcon(dentaltech.level)}
              level={dentaltech.level}
              statusIcon={renderStatusIcon(dentaltech.status)}
              status={dentaltech.status}
              categoryName={dentaltech.dentalTechCategory.name}
              detail={dentaltech.detail}
              teeth={dentaltech.teeth}
              datetime={dentaltech.deadline}
              creator={dentaltech.creator.name}
            />
          ))
        }
      </div>
    </div>
  );
};
