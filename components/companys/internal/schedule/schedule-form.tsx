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

//schema
import { CreateScheduleSchema } from "@/schemas";

//props
import { CardCategory } from "@/components/props/wrapper/card-category";
import { SelectCategory } from "@/components/props/component/select-category";

//actions
import { useParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Schedule } from "@/actions/company/public/schedule";
import { SubmitButton } from "@/components/props/component/submit-button";
import { Input } from "@/components/ui/input";
import { useTransactionCategories } from "@/hooks/internal/category/use-tc";
import { useDentists } from "@/hooks/internal/use-dentist";
import { useScheduleCategories } from "@/hooks/internal/category/use-sc";

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
  const params = useParams();
  const companyId = params.companyId as string;
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
    startTransition(() => {
      Schedule(values, companyId)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            toast.success(data.success);

            setOpen(false);
            onSuccess?.();
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(OnSubmit)}>
        <CardCategory
          icon={<Aperture />}
          title="รายการนัดหมาย"
          description="รายการนัดหมาย / ข้อมูลการนัดหมาย"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="scheduleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">เลือกวันที่</FormLabel>
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
