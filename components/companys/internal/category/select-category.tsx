"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";

interface Category {
  id: string;
  name: string;
}

interface SelectCategoryProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  companyId: string;
  placeholder?: string;
}

export const SelectCategory = ({
  value,
  onValueChange,
  disabled = false,
  companyId,
  placeholder = "เลือกหมวดหมู่",
}: SelectCategoryProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `/api/companies/${companyId}/category/transaction`
        );

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("ไม่พบข้อมูลหมวดหมู่", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [companyId]);

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
