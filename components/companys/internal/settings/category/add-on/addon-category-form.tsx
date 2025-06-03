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

import { CreateAddOnCategorySchema } from "@/schemas";

//actions
import { CardCategory } from "@/components/shared/card";
import { Album } from "lucide-react";
import { toast } from "sonner";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { useCompany } from "@/context/context";
import { CommonCategoryFormProps } from "@/interface/props";
import { createAddOnCategory, updateAddOnCategory } from "@/hooks";

export const CreateAddOnCategoryForm = ({
  setOpen,
  onSuccess,
  updateData,
}: CommonCategoryFormProps) => {
  const { companyId } = useCompany();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateAddOnCategorySchema>>({
    resolver: zodResolver(CreateAddOnCategorySchema),
    defaultValues: updateData ?? {
      name: "",
      description: "",
      price: 0,
      stock: 0,
    },
  });

  const OnSubmit = (values: z.infer<typeof CreateAddOnCategorySchema>) => {
    startTransition(async () => {
      let data;

      if (updateData?.id) {
        data = await updateAddOnCategory(
          values,
          companyId,
          updateData.id
        );
      } else {
        data = await createAddOnCategory(values, companyId);
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
        <CardCategory icon={<Album />} title="หมวดหมู่รายการสินค้าเสริม">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อสินค้า</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="ยาชา, ยาแก้ปวด, ..."
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
                      placeholder="รายละเอียด..."
                    />
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
                  <FormLabel>ราคาต่อหน่วย (ชิ้น)</FormLabel>
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
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>จำนวนสินค้าคงคลัง (ชิ้น)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="จำนวน...ชิ้น"
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
