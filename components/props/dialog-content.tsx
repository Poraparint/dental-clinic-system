"use client"

interface DialogContentFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogPortal } from "@/components/ui/dialog";

export const DialogContentForm = ({
  open,
  setOpen,
  title,
  description,
  children
}: DialogContentFormProps) => {

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
