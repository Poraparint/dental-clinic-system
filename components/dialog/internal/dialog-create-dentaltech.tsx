"use client";

import { DialogButton } from "@/components/shared/dialog/dialog-button";
import { Aperture } from "lucide-react";
import { useState } from "react";
import { CreateDentaltechForm } from "@/components/companys/internal/dentaltech/dentaltech-form";
import { Transaction } from "@/types/transaction";
interface DialogCreateDentaltechProps {
  onSuccess?: () => void;
  transaction: Transaction;
}

// ตัวอย่างการใช้งาน
export const DialogCreateDentalTech = ({
  onSuccess,
  transaction,
}: DialogCreateDentaltechProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogButton
        icon={<Aperture />}
        dialogTitle="สร้างงานทันตกรรม"
        dialogDescription="กรอกข้อมูลเพื่อสร้างงานทันตกรรม"
        title="ทันตกรรม"
        open={open}
        setOpen={setOpen}
        variant="azurite"
      >
        <CreateDentaltechForm
          setOpen={setOpen}
          onSuccess={onSuccess}
          transaction={transaction}
        />
      </DialogButton>
    </>
  );
};
