"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

//ui
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { CreateDentalTechCategorySchema } from "@/schemas";

//actions
import { CardCategory } from "@/components/shared/card";
import { Clock1 } from "lucide-react";
import { toast } from "sonner";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { createScheduleCategory } from "@/hooks/internal/company/category/use-sc";
import { useCompany } from "@/context/context";

interface CreateAppointmentCategoryFormProps {
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export const CreateAppointmentCategoryForm = ({
  setOpen,
  onSuccess,
}: CreateAppointmentCategoryFormProps) => {
  const { companyId } = useCompany();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateDentalTechCategorySchema>>({
    resolver: zodResolver(CreateDentalTechCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const OnSubmit = (values: z.infer<typeof CreateDentalTechCategorySchema>) => {
    startTransition(async () => {
      const data = await createScheduleCategory(values, companyId);

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
      <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-4">
        <CardCategory icon={<Clock1 />} title="หมวดหมู่เวลานัด">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อเวลานัด</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="09:00, 09:30, 11:00, ..."
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
            label="เพิ่มหมวดหมู่"
            type="submit"
            isPending={isPending}
          />
        </div>
      </form>
    </Form>
  );
};
