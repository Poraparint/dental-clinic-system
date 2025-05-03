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
  categories: { id: string; name: string }[];
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
        <SelectTrigger>
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
              {cat.name}
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
