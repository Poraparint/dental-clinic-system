import { Button } from "@/components/ui/button";
import { DialogContentForm } from "@/components/shared/dialog/dialog-content";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { VariantType } from "@/types/variant";
import { TooltipWrapper } from "@/components/shared/tooltip";
interface DialogButtonProps {
  icon?: React.ReactNode;
  title?: string;
  children: React.ReactNode;
  dialogTitle?: string;
  dialogDescription?: string;
  open: boolean;
  variant?: VariantType;
  setOpen: (open: boolean) => void;
  tooltip?: string;
  className?: string;
}

export const DialogButton = ({
  icon,
  title,
  children,
  dialogTitle,
  dialogDescription,
  variant = "charoite",
  open,
  setOpen,
  tooltip,
  className
}: DialogButtonProps) => {

  const button = (
    <Button variant={variant} onClick={() => setOpen(true)} className={className}>
      {icon}
      {title}
    </Button>
  );

  return (
    <>
      {tooltip ? (
        <TooltipWrapper content={tooltip}>
          { button }
        </TooltipWrapper>
      ) : (
        button
      )}
      <DialogContentForm
        open={open}
        setOpen={setOpen}
        title={dialogTitle}
        description={dialogDescription}
      >
        {children}
        <DialogFooter className="absolute bottom-6 left-5">
          <DialogClose asChild>
            <Button variant="outline" size="lg">
              ย้อนกลับ
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContentForm>
    </>
  );
};
