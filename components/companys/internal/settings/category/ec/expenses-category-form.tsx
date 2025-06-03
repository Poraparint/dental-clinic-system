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
import { BriefcaseBusiness } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { SubmitButton } from "@/components/shared/button/submit-button";
import {
  createExpensesCategory,
  updateExpensesCategory,
} from "@/hooks";
import { useCompany } from "@/context/context";
import { colorOptions } from "@/components/shared/common/color-options";
import { CommonCategoryFormProps } from "@/interface/props";

export const CreateExpensesCategoryForm = ({
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
      color: "#D4C8BE",
    },
  });

  const watchName = form.watch("name");
  const watchDescription = form.watch("description");
  const watchColor = form.watch("color");

  const OnSubmit = (values: z.infer<typeof CreateCommonCategorySchema>) => {
    startTransition(async () => {
      let data;

      if (updateData?.id) {
        data = await updateExpensesCategory(values, companyId, updateData.id);
      } else {
        data = await createExpensesCategory(values, companyId);
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
        <CardCategory
          icon={<BriefcaseBusiness />}
          title="หมวดหมู่ค่าใช้จ่าย"
          description="เพิ่มหมวดหมู่การใช้จ่าย"
        >
          <div className="space-y-3 mb-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อชนิดรายจ่าย</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="อุปกรณ์ / การทำงาน, เงินเดือนพนักงาน, เดินทาง / ท่องเที่ยว, ..."
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
                      placeholder="ค่าใช้จ่ายอุปกรณ์, ค่าใช้จ่ายเดินทางท่องเที่ยว, เงินเดือนพนักงาน, ..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>สีหมวดหมู่</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isPending}
                      >
                        <SelectTrigger className="w-[180px]">
                          <div className="flex items-center gap-2">
                            <SelectValue placeholder="เลือกสี" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {colorOptions.map((color) => (
                            <SelectItem key={color.id} value={color.id}>
                              <div className="flex items-center gap-2">
                                <div
                                  className="size-4 rounded-full"
                                  style={{ backgroundColor: color.id }}
                                />
                                {color.name}
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
          <Card>
            <CardContent>
              <div className="flex items-center gap-3">
                <div
                  className="h-12 w-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: watchColor }}
                >
                  <BriefcaseBusiness className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {watchName || "ชื่อหมวดหมู่ตัวอย่าง"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {watchDescription || "คำอธิบายหมวดหมู่"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
