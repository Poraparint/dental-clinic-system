"use client";

import { DialogButton } from "@/components/props/wrapper/dialog-button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { RecheckForm } from "@/components/companys/internal/recheck/recheck-form";

// ตัวอย่างการใช้งาน
export const DialogCreateRecheck = ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogButton
        title="เพิ่มรายการ"
        icon={<PlusIcon />}
        dialogTitle="เพิ่มรายการรีเช็ค / เพิ่มรายการรีเช็ค"
        dialogDescription="กรอกข้อมูลเพื่อสร้างรายการใหม่"
        open={open}
        setOpen={setOpen}
      >
        <RecheckForm setOpen={setOpen} onSuccess={onSuccess} />
      </DialogButton>
    </>
  );
};
