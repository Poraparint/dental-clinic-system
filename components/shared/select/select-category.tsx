"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";

interface SelectCategoryProps {
  value: string | undefined;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  isLoading?: boolean;
  categories: {
    id: string;
    name?: string;
    color?: string | null;
    unitPrice?: number | null;
    icon?: React.ReactNode;
    user?: {
      name: string;
    };
  }[];
}

export const SelectCategory = ({
  value,
  onValueChange,
  disabled = false,
  placeholder = "เลือกหมวดหมู่",
  isLoading = false,
  categories = [],
}: SelectCategoryProps) => {
  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled || isLoading}
    >
      <FormControl>
        <SelectTrigger >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {isLoading ? (
          <SelectItem value="loading" disabled>
            กำลังโหลด...
          </SelectItem>
        ) : categories.length > 0 ? (
          categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.color && (
                <div
                  className="size-4 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
              )}
              {cat.icon && (
                cat.icon
              )}
              <span>{cat.name || cat.user?.name || cat.id}</span>
              {typeof cat.unitPrice === "number" && (
                <span className="text-sm text-muted-foreground">
                  ฿{cat.unitPrice.toFixed(2)}
                </span>
              )}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="no-data" disabled>
            ไม่พบข้อมูล
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};
