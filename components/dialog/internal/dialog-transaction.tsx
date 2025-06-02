"use client";

import { DialogButton } from "@/components/shared/dialog/dialog-button";
import { PlusIcon, SquarePen } from "lucide-react";
import { useState } from "react";
import { CreateTransactionForm } from "@/components/companys/internal/patient/transaction/transaction-form";
import { Transaction } from "@/types";
import { toTransactionFormData } from "@/lib/utils/transform/model";

interface DialogCreateTransactionProps {
  onSuccess?: () => void;
  transaction?: Transaction;
}
// ตัวอย่างการใช้งาน
export const DialogCreateTransaction = ({
  onSuccess,
}: DialogCreateTransactionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogButton
        title="เพิ่มรายการ"
        icon={<PlusIcon />}
        dialogTitle="เพิ่มรายการธุรกรรม"
        dialogDescription="กรอกข้อมูลเพื่อสร้างรายการธุรกรรม"
        open={open}
        setOpen={setOpen}
      >
        <CreateTransactionForm setOpen={setOpen} onSuccess={onSuccess} />
      </DialogButton>
    </>
  );
};

export const DialogUpdateTransaction = ({
  onSuccess,
  transaction,
}: DialogCreateTransactionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <DialogButton
      icon={<SquarePen />}
      dialogTitle="แก้ไขข้อมูลคนไข้"
      dialogDescription="ปรับปรุงข้อมูลของคนไข้"
      variant="secondary"
      open={open}
      setOpen={setOpen}
      className="rounded-full size-10"
    >
      <CreateTransactionForm
        setOpen={setOpen}
        onSuccess={onSuccess}
        transactionData={transaction ? toTransactionFormData(transaction) : undefined}
      />
    </DialogButton>
  );
};
