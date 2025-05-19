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
import { CardCategory } from "@/components/props/wrapper/card-category";
import { BriefcaseBusiness } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { SubmitButton } from "@/components/props/component/button/submit-button";
import { createExpensesCategory } from "@/hooks/internal/category/use-ec";

interface CreateExpensesCategoryFormProps {
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export const CreateExpensesCategoryForm = ({
  setOpen,
  onSuccess,
}: CreateExpensesCategoryFormProps) => {
  const params = useParams();
  const companyId = params.companyId as string;

  const [isPending, startTransition] = useTransition();

  const colorOptions = [
    { id: "#a78bfa", name: "ม่วงอ่อน" }, // Purple-300
    { id: "#f472b6", name: "ชมพูพาสเทล" }, // Pink-400
    { id: "#fb923c", name: "ส้มอบอุ่น" }, // Orange-400
    { id: "#fbbf24", name: "เหลืองทอง" }, // Amber-400
    { id: "#34d399", name: "มินต์กรีน" }, // Emerald-400
    { id: "#60a5fa", name: "ฟ้าสดใส" }, // Blue-400
    { id: "#c084fc", name: "ลาเวนเดอร์" }, // Purple-400
    { id: "#663A44", name: "ม่วงแดง" },
    { id: "#D4C8BE", name: "ครีม" },
    { id: "#43474D", name: "เทาเข้ม" },
  ];

  const form = useForm<z.infer<typeof CreateDentalTechCategorySchema>>({
    resolver: zodResolver(CreateDentalTechCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      color: "#D4C8BE",
    },
  });

  const watchName = form.watch("name");
  const watchDescription = form.watch("description");
  const watchColor = form.watch("color");

  const OnSubmit = (values: z.infer<typeof CreateDentalTechCategorySchema>) => {
    startTransition(async () => {
      const data = await createExpensesCategory(values, companyId);

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
            label="เพิ่มหมวดหมู่"
            type="submit"
            isPending={isPending}
          />
        </div>
      </form>
    </Form>
  );
};
