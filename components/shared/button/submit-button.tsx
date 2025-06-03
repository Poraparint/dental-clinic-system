import { Button } from "@/components/ui/button";
import { VariantType } from "@/types";

interface SubmitButtonProps {
  label?: string;
  icon?: React.ReactNode;
  isPending?: boolean;
  variant?: VariantType;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  tooltip?: string;
}

export const SubmitButton = ({
  label,
  icon,
  isPending = false,
  variant= "charoite",
  type,
  onClick,
  disabled = false,
}: SubmitButtonProps) => {
  return (
    
    <Button
      variant={variant}
      typeof={type}
      onClick={onClick}
      disabled={disabled || isPending}
      className="px-9"
    >
      {isPending ? "กำลังบันทึก..." : label ? label : icon}
    </Button>
    
    
  );
};
