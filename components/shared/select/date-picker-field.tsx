"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, formatDate } from "@/lib/utils";
import { addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { UseFormReturn, FieldPath, FieldValues } from "react-hook-form";

interface DatePickerFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label?: string;
  withQuickSelect?: boolean;
  aboveOneWeek?: boolean;
  isLabel?: boolean;
}

export const DatePickerField = <T extends FieldValues>({
  form,
  name,
  label = "เลือกวันที่",
  withQuickSelect = true,
  aboveOneWeek = true,
  isLabel = true,
}: DatePickerFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {isLabel && (
            <FormLabel className="text-sm font-medium">{label}</FormLabel>
          )}
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="size-4" />

                  {field.value ? (
                    <span className="ml-2">{formatDate(field.value)}</span>
                  ) : (
                    <span>เลือกวันที่</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="flex w-auto flex-col space-y-2 p-2 bg-background"
              >
                {withQuickSelect && (
                  <Select
                    onValueChange={(value) =>
                      field.onChange(addDays(new Date(), parseInt(value)))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกรายการ" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="0">วันนี้</SelectItem>
                      <SelectItem value="1">พรุ่งนี้</SelectItem>
                      <SelectItem value="3">อีก 3 วัน</SelectItem>
                      <SelectItem value="7">อีก 1 สัปดาห์</SelectItem>
                      {aboveOneWeek && (
                        <>
                          <SelectItem value="14">อีก 2 สัปดาห์</SelectItem>
                          <SelectItem value="28">อีก 4 สัปดาห์</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                )}
                <div className="rounded-md border">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </div>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
