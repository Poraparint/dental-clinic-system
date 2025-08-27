"use client";

import { FormNotFound } from "@/components/form-not-found";
import { Loading } from "@/components/loading";
import {
  renderLevelIcon,
  renderStatusIcon,
} from "@/components/props/render/render-icons";
import { CalendarEventCard } from "@/components/props/component/card/event-card";
import { DentalTech, ApiError } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

export const DentalTechTable = ({
  date,
  dentalTechs,
  error,
  isLoading,
}: {
  date: Date;
  dentalTechs: DentalTech[];
  error: ApiError | null;
  isLoading: boolean;
}) => {
  const itemsForDate = dentalTechs.filter(
    (item) => new Date(item.deadline).toDateString() === date.toDateString()
  );

  if (isLoading) return <Loading />;

  if (error || !itemsForDate.length) {
    return (
      <FormNotFound
        message={error?.error || "ไม่พบข้อมูล"}
        description={error?.description || "ไม่มีกำหนดส่งงานในวันนี้"}
      />
    );
  }

  return (
    <div className="space-y-4">
     <ScrollArea className="h-[36rem]">
        {itemsForDate.map((dentaltech) => (
          <CalendarEventCard
            key={dentaltech.id}
            name={dentaltech.patient.name}
            phone={dentaltech.patient.phone}
            levelIcon={renderLevelIcon(dentaltech.level)}
            level={dentaltech.level}
            statusIcon={renderStatusIcon(dentaltech.status)}
            status={dentaltech.status}
            categoryName={dentaltech.dentalTechCategory.name}
            detail={dentaltech.detail}
            teeth={dentaltech.teeth || 0}
            datetime={dentaltech.deadline}
            dentist={dentaltech.creator.name}
          />
        ))}
      </ScrollArea>
    </div>
  );
};
