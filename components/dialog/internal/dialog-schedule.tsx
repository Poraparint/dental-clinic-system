"use client";

import { DialogButton } from "@/components/shared/dialog/dialog-button";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { ScheduleForm } from "@/components/companys/internal/schedule/schedule-form";

interface DialogCreateScheduleProps {
  onSuccess?: () => void;
  datetime: Date;
}
// ตัวอย่างการใช้งาน
export const DialogCreateSchedule = ({
  onSuccess,
  datetime,
}: DialogCreateScheduleProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogButton
        icon={<Calendar />}
        title="เพิ่มรายการนัด"
        dialogTitle="เพิ่มรายการนัดหมาย / จัดการรายการนัดหมาย"
        dialogDescription="กรอกข้อมูลเพื่อสร้างรายการใหม่"
        open={open}
        setOpen={setOpen}
      >
        <ScheduleForm
          setOpen={setOpen}
          onSuccess={onSuccess}
          datetime={datetime}
        />
      </DialogButton>
    </>
  );
};
