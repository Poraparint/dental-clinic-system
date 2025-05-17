import { Button } from "@/components/ui/button";
import { DialogContentForm } from "@/components/props/wrapper/dialog-content";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { VariantType } from "@/types/variant";
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
}: DialogButtonProps) => {

  const button = (
    <Button variant={variant} onClick={() => setOpen(true)}>
      {icon}
      {title}
    </Button>
  );

  return (
    <>
      {tooltip ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
