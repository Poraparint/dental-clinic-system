"use client"

interface DialogContentFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const DialogContentForm = ({
  open,
  setOpen,
  title,
  description,
  children
}: DialogContentFormProps) => {

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
      
    </Dialog>
  );
};
