"use client";

import * as z from "zod";

//params
import { useParams } from "next/navigation";

//react
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

//icons
import { Circle } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

//schema
import { CreateTransactionSchema } from "@/schemas";

//props
import { CardCategory } from "@/components/props/wrapper/card-category";
import { SelectCategory } from "@/components/props/component/select-category";

//actions
import { createTransaction } from "@/actions/company/public/transaction";
import { Textarea } from "@/components/ui/textarea";
import { useTransactionCategories } from "@/hooks/internal/use-tc";
import { DatePickerField } from "@/components/props/component/date-picker-field";

interface CreateTransactionFormProps {
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export const CreateTransactionForm = ({
  setOpen,
  onSuccess,
}: CreateTransactionFormProps) => {
  const params = useParams();
  const patientId = params.patientId as string;
  const companyId = params.companyId as string;
  const { categories, isLoading } = useTransactionCategories(companyId);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateTransactionSchema>>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      datetime: new Date(),
      transactionCategoryId: "",
      detail: "",
      price: 0,
      paid: 0,
    },
  });
  const transactionCategoryId = form.watch("transactionCategoryId");

  const selectedCategory = categories?.find?.(
    (cat) => cat.id === transactionCategoryId
  );

  const OnSubmit = (values: z.infer<typeof CreateTransactionSchema>) => {
    startTransition(() => {
      createTransaction(values, patientId, companyId)
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
        <CardCategory icon={<Circle size={15} />} title="รายการธุรกกรม">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DatePickerField
              form={form}
              name="datetime"
              withQuickSelect={false}
            />

            <FormField
              control={form.control}
              name="transactionCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    ประเภทการทำธุรกรรม
                  </FormLabel>
                  <SelectCategory
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isPending}
                    isLoading={isLoading}
                    categories={categories}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* แถวที่สอง: รายละเอียด */}
          <FormField
            control={form.control}
            name="detail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  รายละเอียด
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={isPending}
                    placeholder="กรอกรายละเอียดการทำธุรกรรม"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* แถวที่สาม: ราคาและการชำระเงิน */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">ราคา</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        ฿
                      </span>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder={
                          selectedCategory?.price
                            ? selectedCategory.price.toFixed(2)
                            : "0.00"
                        }
                        type="number"
                        className="pl-8"
                        value={field.value === 0 ? "" : field.value}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    จ่ายแล้ว
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        ฿
                      </span>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="0.00"
                        type="number"
                        className="pl-8"
                        value={field.value === 0 ? "" : field.value}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardCategory>
        <div className="flex justify-end">
          <Button
            className="px-9"
            typeof="submit"
            size="lg"
            disabled={isPending}
          >
            เพิ่มรายการใหม่
          </Button>
        </div>
      </form>
    </Form>
  );
};
