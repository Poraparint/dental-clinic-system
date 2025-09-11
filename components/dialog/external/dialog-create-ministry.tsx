"use client";

import { DialogButton } from "@/components/shared/dialog/dialog-button";
import { CreateMinistryForm } from "@/components/companys/external/create-ministry-form";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

interface DialogCreateMinistryProps {
  onSuccess?: () => void;
}

export const DialogCreateMinistry = ({
  onSuccess,
}: DialogCreateMinistryProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogButton
        title="สร้างคลินิกใหม่"
        icon={<PlusIcon />}
        dialogTitle="สร้างคลินิกใหม่"
        dialogDescription="กรอกข้อมูลในแบบฟอร์มเพื่อสร้างคลินิกใหม่"
        open={open}
        setOpen={setOpen}
      >
        <CreateMinistryForm setOpen={setOpen} onSuccess={onSuccess} />
      </DialogButton>
    </>
  );
};
