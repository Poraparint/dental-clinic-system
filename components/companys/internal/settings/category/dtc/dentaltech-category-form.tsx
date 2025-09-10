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

import { CreateCommonCategorySchema } from "@/schemas";

//actions
import { CardCategory } from "@/components/shared/card";
import { Aperture } from "lucide-react";
import { toast } from "sonner";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { createDentalTechCategory, updateDentalTechCategory } from "@/hooks/internal/company/category/use-dtc";
import { useCompany } from "@/context/context";
import { CommonCategoryFormProps } from "@/interface/props";

export const CreateDentalTechCategoryForm = ({
  setOpen,
  onSuccess,
  updateData,
}: CommonCategoryFormProps) => {
  const { companyId } = useCompany();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateCommonCategorySchema>>({
    resolver: zodResolver(CreateCommonCategorySchema),
    defaultValues: updateData ?? {
      name: "",
      description: "",
    },
  });

  const OnSubmit = (values: z.infer<typeof CreateCommonCategorySchema>) => {
    startTransition(async () => {
      let data;

      if (updateData?.id) {
        data = await updateDentalTechCategory(
          values,
          companyId,
          updateData.id
        );
      } else {
        data = await createDentalTechCategory(values, companyId);
      }

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
        <CardCategory icon={<Aperture />} title="หมวดหมู่รายการทันตกรรม">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อรายการทันตกรรม</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="ครอบฟันโลหะล้วน, ครอบฟันเซรามิกล้วน, ครอบฟันเซอร์โคเนีย, ..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>รายละเอียด</FormLabel>
                  <FormControl>
                    <Input
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
            label={updateData?.id ? "อัพเดตข้อมูล" : "เพิ่มหมวดหมู่"}
            type="submit"
            isPending={isPending}
          />
        </div>
      </form>
    </Form>
  );
};
