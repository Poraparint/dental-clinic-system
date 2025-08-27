"use client";
import { RoleGate } from "@/components/props/wrapper/role-gate";
import { DialogButton } from "@/components/shared/dialog/dialog-button";
import { Button } from "@/components/ui/button";
import { CompanyRole } from "@prisma/client";
import { Trash } from "lucide-react";
import { useState } from "react";

export function ConfirmDeleteDialog({
  onConfirm,
  itemName,
}: {
  onConfirm: () => void;
  itemName?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <RoleGate
      allowedRole={[
        CompanyRole.MANAGER,
        CompanyRole.COMANAGER,
        CompanyRole.DENTIST,
      ]}
      fallback={<></>}
    >
      <DialogButton
        icon={<Trash />}
        open={open}
        setOpen={setOpen}
        dialogTitle="ยืนยันการลบ"
        dialogDescription={`คุณแน่ใจหรือไม่ว่าต้องการลบ ${itemName ?? "รายการนี้"}? การลบไม่สามารถย้อนกลับได้.`}
        variant="destructive"
      >
        <div className="flex justify-end gap-2 mt-6">
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            ยืนยันการลบ
          </Button>
        </div>
      </DialogButton>
    </RoleGate>
  );
}
