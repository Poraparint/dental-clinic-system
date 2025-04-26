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
import { Button } from "@/components/ui/button";

import { CreateDentalTechCategorySchema } from "@/schemas";

//actions
import { CardCategory } from "@/components/props/card-category";
import { CreditCard } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { CreateExpensesCategory } from "@/actions/company/manager/expenses-category";

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

  const form = useForm<z.infer<typeof CreateDentalTechCategorySchema>>({
    resolver: zodResolver(CreateDentalTechCategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const OnSubmit = (values: z.infer<typeof CreateDentalTechCategorySchema>) => {
    startTransition(() => {
      CreateExpensesCategory(values, companyId)
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
      <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-4">
        <CardCategory icon={<CreditCard />} title="หมวดหมู่ค่าใช้จ่าย">
          <div className="space-y-3">
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
          </div>
        </CardCategory>

        <Button
          typeof="submit"
          className="flex justify-self-end px-9"
          size="lg"
          disabled={isPending}
        >
          เพิ่มหมวดหมู่
        </Button>
      </form>
    </Form>
  );
};
