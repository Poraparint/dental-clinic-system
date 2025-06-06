"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
//icons
import { Clock } from "lucide-react";
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

//schema
import { CreateScheduleSchema } from "@/schemas";

//props
import { CardCategory } from "@/components/shared/card";
import { SelectCategory } from "@/components/shared/select/select-category";

//actions
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { Input } from "@/components/ui/input";
import { useTransactionCategories } from "@/hooks/internal/company/category/use-tc";
import { useDentists } from "@/hooks/internal/company/use-dentist";
import { useScheduleCategories } from "@/hooks/internal/company/category/use-sc";
import { createSchedule } from "@/hooks/internal/company/use-schedule";
import { useCompany } from "@/context/context";

interface ScheduleFormProps {
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
  datetime: Date;
}

export const ScheduleForm = ({
  setOpen,
  onSuccess,
  datetime,
}: ScheduleFormProps) => {
  const { companyId } = useCompany();
  const { categories: tc, isLoading: tcLoading } =
    useTransactionCategories(companyId);
  const { dentists, isLoading: dentistLoading } = useDentists(companyId);
  const { categories: schedule, isLoading: scheduleLoading } =
    useScheduleCategories(companyId);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateScheduleSchema>>({
    resolver: zodResolver(CreateScheduleSchema),
    defaultValues: {
      datetime,
      scheduleId: "",
      phone: "",
      patientName: "",
      detail: "",
      tcId: "",
      memberId: "",
    },
  });

  const OnSubmit = (values: z.infer<typeof CreateScheduleSchema>) => {
    startTransition(async () => {
      const data = await createSchedule(values, companyId);

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
          icon={<Clock />}
          title="รายการนัดหมาย"
          description="รายการนัดหมาย / ข้อมูลการนัดหมาย"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="scheduleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">เลือกเวลา</FormLabel>
                  <SelectCategory
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isPending}
                    isLoading={scheduleLoading}
                    categories={schedule}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tcId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">หมวดหมู่</FormLabel>
                  <SelectCategory
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isPending}
                    isLoading={tcLoading}
                    categories={tc}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อคนไข้</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="ชื่อ-นามสกุล"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="memberId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">เลือกทันตแพทย์</FormLabel>
                  <SelectCategory
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isPending}
                    isLoading={dentistLoading}
                    categories={dentists}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>เบอร์ติดต่อ</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="เบอร์ติดต่อ"
                    />
                  </FormControl>
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
          </div>
        </CardCategory>
        <div className="flex justify-end">
          <SubmitButton
            label="เพิ่มนัดใหม่"
            type="submit"
            isPending={isPending}
          />
        </div>
      </form>
    </Form>
  );
};
