"use client";
 
interface DialogContentFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
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
  className
}: DialogContentFormProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogContent
        className={className}
      >
        <DialogHeader className="bg-gradient-to-r from-indigo-400 to-indigo-200 dark:from-indigo-900 dark:to-indigo-400 absolute p-5 w-full rounded-t-md">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="mt-16">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
