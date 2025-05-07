"use client";

interface DialogContentFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const DialogContentForm = ({
  open,
  setOpen,
  title,
  description,
  children,
}: DialogContentFormProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogContent>
        <DialogHeader className="bg-gradient-to-r from-indigo-400 to-indigo-200 dark:from-indigo-900 dark:to-indigo-400 absolute p-5 w-full rounded-t-md">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="mt-14">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
