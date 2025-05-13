"use client";

import { CalendarClock, User, Info, Phone, FileText } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FormNotFound } from "@/components/form-not-found";
import { Loading } from "@/components/loading";
import { formatDate } from "@/lib/utils";
import { ApiError } from "@/types/api-error";
import { Schedule } from "@/types/schedule";

export const ScheduleCard = ({
  date,
  schedules,
  error,
  isLoading,
}: {
  date: Date;
  schedules: Schedule[];
  error: ApiError | null;
  isLoading: boolean;
}) => {
    if (isLoading) return <Loading />;
    
  const filteredSchedules = schedules.filter((schedule) => {
    const scheduleDate = new Date(schedule.datetime);
    return (
      scheduleDate.getFullYear() === date.getFullYear() &&
      scheduleDate.getMonth() === date.getMonth() &&
      scheduleDate.getDate() === date.getDate()
    );
  });

  if (error || !filteredSchedules.length) {
    return (
      <FormNotFound
        message={error?.error || "ไม่พบข้อมูล"}
        description={error?.description || "ไม่มีรายการนัดหมายในวันนี้"}
      />
    );
  }

  return (
    <div className="space-y-3">
      {filteredSchedules.map((schedule) => (
        <Dialog key={schedule.id}>
          <DialogTrigger asChild>
            <div className="border rounded-lg p-4 shadow hover:bg-muted transition-colors cursor-pointer space-y-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <CalendarClock className="w-4 h-4" />
                  {schedule.scheduleCategory?.name || "HH:mm"}
                </span>
              </div>
              <div className="text-lg font-medium">{schedule.patientName}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <User className="w-4 h-4" />
                {schedule.dentist?.name || "ไม่ระบุทันตแพทย์"}
              </div>
            </div>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>รายละเอียดการนัด</DialogTitle>
              <DialogDescription>
                ข้อมูลทั้งหมดของ {schedule.patientName}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              <DetailRow
                icon={<CalendarClock />}
                label="วันเวลา"
                value={formatDate(schedule.datetime)}
              />
              <DetailRow
                icon={<User />}
                label="ทันตแพทย์"
                value={schedule.dentist?.name || "ไม่ระบุ"}
              />
              <DetailRow
                icon={<Phone />}
                label="เบอร์โทร"
                value={schedule.phone || "ไม่ระบุ"}
              />
              <DetailRow
                icon={<FileText />}
                label="รายละเอียด"
                value={schedule.detail || "ไม่มี"}
              />
              <DetailRow
                icon={<Info />}
                label="ประเภทบริการ"
                value={schedule.transactionCategory?.name || "ไม่ระบุ"}
              />
              <DetailRow
                icon={<User />}
                label="ผู้สร้างรายการ"
                value={schedule.creator?.name || "ไม่ระบุ"}
              />
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

const DetailRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3">
    <div className="text-muted-foreground mt-1">{icon}</div>
    <div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  </div>
);
