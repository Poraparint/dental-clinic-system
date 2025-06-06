"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
//icons
import { Aperture } from "lucide-react";
import { toast } from "sonner";

//ui
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//schema
import { CreateDentalTechSchema } from "@/schemas";

//props
import { CardCategory } from "@/components/shared/card";
import { SelectCategory } from "@/components/shared/select/select-category";

//actions
import { Textarea } from "@/components/ui/textarea";
import {
  useDentaltTechCategories,
  createDentalTech,
} from "@/hooks";
import { DatePickerField } from "@/components/shared/select/date-picker-field";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { Transaction } from "@/types";
import { Input } from "@/components/ui/input";
import { useCompany } from "@/context/context";

interface CreateDentaltechFormProps {
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
  transaction: Transaction;
}

export const CreateDentaltechForm = ({
  setOpen,
  onSuccess,
  transaction,
}: CreateDentaltechFormProps) => {
  const { companyId } = useCompany();
  const { categories, isLoading: dctLoading } =
    useDentaltTechCategories(companyId);

  const [isPending, startTransition] = useTransition();

  const levelOptions = [
    { id: "#0369a1", name: "ปกติ" },
    { id: "#fb923c", name: "เร่งด่วน" },
    { id: "#DC143C", name: "ด่วนมาก" },
  ];

  const form = useForm<z.infer<typeof CreateDentalTechSchema>>({
    resolver: zodResolver(CreateDentalTechSchema),
    defaultValues: {
      deadline: new Date(),
      detail: "",
      level: "ปกติ",
      transactionId: transaction.id,
      teeth: 0,
      dctId: "",
    },
  });

  const OnSubmit = (values: z.infer<typeof CreateDentalTechSchema>) => {
    startTransition(async () => {
      const data = await createDentalTech(values, companyId);

      if (data.error) {
        toast.error(data.error, {
          description: data.description,
        });
      } else if (data.success) {
        toast.success(data.success);
        setOpen(false);
        onSuccess?.();
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(OnSubmit)}>
        <CardCategory
          icon={<Aperture />}
          title="รายการงานทันตกรรม"
          description="รายการงานทันตกรรม / ข้อมูลงานทันตกรรม"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DatePickerField
              form={form}
              name="deadline"
              label="เลือกวันส่งมอบงาน"
            />
            <FormField
              control={form.control}
              name="dctId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">หมวดหมู่</FormLabel>
                  <SelectCategory
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isPending}
                    isLoading={dctLoading}
                    categories={categories}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="detail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">รายการ</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isPending}
                      placeholder="รายละเอียด"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="teeth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-text-muted-foreground">
                    จำนวน (ซี่)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="จำนวนกี่ซี่"
                      value={field.value === 0 ? "" : field.value}
                      disabled={isPending}
                      className="font-medium"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">ระดับ</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isPending}
                      >
                        <SelectTrigger className="w-[180px]">
                          <div className="flex items-center gap-2">
                            <SelectValue placeholder="เลือกระดับงาน" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {levelOptions.map((level) => (
                            <SelectItem key={level.id} value={level.name}>
                              <div className="flex items-center gap-2">
                                <div
                                  className="h-4 w-4 rounded-full"
                                  style={{ backgroundColor: level.id }}
                                />
                                {level.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardCategory>
        <div className="flex justify-end">
          <SubmitButton
            label="เพิ่มงานใหม่"
            type="submit"
            isPending={isPending}
          />
        </div>
      </form>
    </Form>
  );
};
