import { TriangleAlert } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-destructive text-destructive-foreground p-3 rounded-md flex items-center gap-x-2 text-sm">
      <TriangleAlert className="size-4" />
      <p>{message}</p>
    </div>
  );
};
