// StepTimeLineItem.tsx
import { formatDate } from "@/lib/utils";
import { CheckCircle, Clock } from "lucide-react";
import { StepDialog } from "@/components/dialog/internal/step-dialog";
import { RecheckList } from "@/types";

interface StepTimeLineItemProps {
  index?: number;
  total?: number;
  step: RecheckList;
}

export const StepTimeLineItem = ({ step }: StepTimeLineItemProps) => {
  const datetime = new Date(step.datetime);
  const isCompleted = datetime < new Date();
  const isToday = datetime.toDateString() === new Date().toDateString();

  const circle = (
    <div className="relative">
      <div
        className={`size-8 rounded-full flex items-center justify-center ${
          isToday
            ? "bg-amethyst-bg text-amethyst-text"
            : isCompleted
              ? "bg-emerald-bg text-emerald-text"
              : "bg-slate-200 text-slate-500"
        }`}
      >
        {isCompleted ? <CheckCircle size={16} /> : <Clock size={16} />}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      <StepDialog step={step}>{circle}</StepDialog>

      <div className="mt-2 text-center max-w-24">
        <p className="text-xs font-medium truncate">
          {step.transactionCategory?.name}
        </p>
        <p className="text-xs text-muted-foreground">{formatDate(datetime)}</p>
      </div>
    </div>
  );
};
