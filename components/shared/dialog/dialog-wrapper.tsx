"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface DialogWrapperProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export const DialogWrapper = ({
  trigger,
  children,
  title = "dialog-title",
  open,
  onOpenChange,
  className,
}: DialogWrapperProps) => {
  const [localOpen, setLocalOpen] = useState(false);
  const isControlled = open !== undefined;

  return (
    <Dialog
      open={isControlled ? open : localOpen}
      onOpenChange={isControlled ? onOpenChange : setLocalOpen}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={className}>
        <DialogTitle className="sr-only">{title}</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
};
