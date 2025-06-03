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

import { CreateTransactionCategorySchema } from "@/schemas";

//actions
import { CardCategory } from "@/components/shared/card";
import { Album } from "lucide-react";
import { toast } from "sonner";
import { SubmitButton } from "@/components/shared/button/submit-button";
import {
  createTransactionCategory,
  updateTransactionCategory,
} from "@/hooks";
import { useCompany } from "@/context/context";
import { TransactionCategoryFormProps } from "@/interface/props";

export const CreateTransactionCategoryForm = ({
  setOpen,
  onSuccess,
  updateData,
}: TransactionCategoryFormProps) => {
  const { companyId } = useCompany();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateTransactionCategorySchema>>({
    resolver: zodResolver(CreateTransactionCategorySchema),
    defaultValues: updateData ?? {
      name: "",
      description: "",
      price: 0,
    },
  });

  const OnSubmit = (
    values: z.infer<typeof CreateTransactionCategorySchema>
  ) => {
    startTransition(async () => {
      let data;

      if (updateData?.id) {
        data = await updateTransactionCategory(
          values,
          companyId,
          updateData.id
        );
      } else {
        data = await createTransactionCategory(values, companyId);
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
        <CardCategory icon={<Album />} title="หมวดหมู่รายการทำฟัน">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อรายการทำฟัน</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="ถอนฟัน, อุดฟัน, ขูดหินปูน, ..."
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
                    <Input {...field} disabled={isPending} placeholder="des" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ราคาเริ่มต้น</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="ราคา"
                      type="number"
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
