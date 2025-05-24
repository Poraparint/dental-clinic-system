"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { RecheckStepCard } from "@/components/props/component/card/recheck-step-card";

import { RecheckList } from "@/types/appointment";

interface StepDialogProps {
  children: ReactNode;
  step: RecheckList;
}

export const StepDialog = ({ children, step }: StepDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div onClick={() => setOpen(true)} className="cursor-pointer">
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogTitle className="sr-only">รายละเอียดนัดหมาย</DialogTitle>
        <RecheckStepCard
          category={step.transactionCategory?.name}
          datetime={new Date(step.datetime)}
          detail={step.detail}
          price={step.price}
        />
      </DialogContent>
    </Dialog>
  );
};
