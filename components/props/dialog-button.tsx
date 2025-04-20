import { Button } from "@/components/ui/button";
import { DialogContentForm } from "@/components/props/dialog-content";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";

interface DialogButtonProps {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  dialogTitle?: string;
  dialogDescription?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const DialogButton = ({
  icon,
  title,
  children,
  dialogTitle,
  dialogDescription,
  open,
  setOpen,
}: DialogButtonProps) => {
  return (
    <>
      <Button onClick={() => setOpen(true)} className="tracking-wide">
        {icon}
        {title}
      </Button>
      <DialogContentForm
        open={open}
        setOpen={setOpen}
        title={dialogTitle}
        description={dialogDescription}
      >
        {children}
        <DialogFooter className="absolute bottom-6 right-[30%]">
          <DialogClose asChild>
            <Button variant="outline" size="lg">ย้อนกลับ</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContentForm>
    </>
  );
};
