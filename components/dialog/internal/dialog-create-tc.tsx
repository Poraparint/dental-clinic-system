"use client";

import { DialogButton } from "@/components/props/dialog-button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { CreateTransactionCategoryForm } from "@/components/companys/internal/settings/tc/transactioncategory-form";
import { TabsContent } from "@radix-ui/react-tabs";

export const DialogCreateTransactionCategory = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TabsContent value="dental-procedures" className="space-y-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">หมวดหมู่ทำฟัน / รายการทำฟัน</h1>
          <DialogButton
            title="เพิ่มหมวดหมู่"
            icon={<PlusIcon />}
            dialogTitle="หมวดหมู่รายการทำฟัน"
            dialogDescription="รายการทำฟัน/หมวดหมู่ทำฟัน"
            open={open}
            setOpen={setOpen}
          >
            <CreateTransactionCategoryForm setOpen={setOpen} />
          </DialogButton>
        </div>
        <hr />
      </TabsContent>
    </>
  );
};
