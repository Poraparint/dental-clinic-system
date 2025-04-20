"use client";

import { DialogButton } from "@/components/props/dialog-button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { CreatePatientForm } from "@/components/companys/internal/patient/patient-form";

// ตัวอย่างการใช้งาน
export const DialogCreatePatient = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogButton
        title="เพิ่มบัตรใหม่"
        icon={<PlusIcon />}
        dialogTitle="เพิ่มบัตรใหม่"
        dialogDescription="กรอกข้อมูลเพื่อสร้างบัตรใหม่"
        open={open}
        setOpen={setOpen}
      >
        <CreatePatientForm setOpen={setOpen} onSuccess={onSuccess} />
      </DialogButton>
    </>
  );
};
