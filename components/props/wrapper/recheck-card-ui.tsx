"use client";
import { forwardRef } from "react";
import { formatDate } from "@/lib/utils";
import { Banknote, NotebookTabs, Phone, User } from "lucide-react";

interface RecheckCardUiProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  createdAt: Date;
  phone: string;
  creator: string;
  transaction: string;
  price: number;
  children?: React.ReactNode;
}

export const RecheckCardUi = forwardRef<HTMLDivElement, RecheckCardUiProps>(
  ({ name, createdAt, phone, creator, transaction, price, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className="rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <div className="px-4 pb-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="border rounded-full p-2">
              <User size={18} className="text-muted-foreground" />
            </div>
            <h3 className="font-medium">{name}</h3>
          </div>
          <div className="text-sm text-muted-foreground">
            {formatDate(createdAt)}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-emerald-600" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} className="text-purple-600" />
              <span>{creator}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <NotebookTabs size={14} className="text-amber-text" />
              <span>{transaction}</span>
            </div>
            <div className="flex items-center gap-2">
              <Banknote size={14} className="text-lapis-text" />
              <span>{price}</span>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
    }
);

RecheckCardUi.displayName = "RecheckCardUi";