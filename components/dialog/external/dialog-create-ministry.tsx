"use client";

import { DialogButton } from "@/components/shared/dialog/dialog-button";
import { CreateMinistryForm } from "@/components/companys/external/create-ministry-form";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

interface DialogCreateMinistryProps {
  onSuccess?: () => void;
}

// ตัวอย่างการใช้งาน
export const DialogCreateMinistry = ({
  onSuccess,
}: DialogCreateMinistryProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogButton
        title="Create Ministry"
        icon={<PlusIcon />}
        dialogTitle="Create New Ministry"
        dialogDescription="Fill in the form to create a new ministry"
        open={open}
        setOpen={setOpen}
      >
        <CreateMinistryForm setOpen={setOpen} onSuccess={onSuccess} />
      </DialogButton>
    </>
  );
};
