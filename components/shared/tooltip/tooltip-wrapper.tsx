import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipWrapperProps {
  content: string | React.ReactNode;
  children: React.ReactNode;
}

export const TooltipWrapper = ({ content, children }: TooltipWrapperProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          {typeof content === "string" ? <span>{content}</span> : content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
