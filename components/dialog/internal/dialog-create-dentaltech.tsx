"use client";

import { DialogButton } from "@/components/props/dialog-button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { CreateDentaltechForm } from "@/components/companys/internal/dentaltech/dentaltech-form";

// ตัวอย่างการใช้งาน
export const DialogCreateDentalTech = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogButton
        title="สร้างงานทันตกรรม"
        icon={<PlusIcon />}
        dialogTitle="สร้างงานทันตกรรม"
        dialogDescription="กรอกข้อมูลเพื่อสร้างงานทันตกรรม"
        open={open}
        setOpen={setOpen}
      >
        <CreateDentaltechForm setOpen={setOpen} onSuccess={onSuccess} />
      </DialogButton>
    </>
  );
};
