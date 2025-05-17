import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  label: string;
  isPending?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

export const SubmitButton = ({
  label,
  isPending = false,
  type,
  onClick,
  disabled = false,
}: SubmitButtonProps) => {
  return (
    <Button
      typeof={type}
      onClick={onClick}
      disabled={disabled || isPending}
      className="px-9"
    >
      {isPending ? "กำลังบันทึก..." : label}
    </Button>
  );
};
