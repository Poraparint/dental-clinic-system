"use client";

import * as z from "zod";

//react
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

//icons
import { Notebook } from "lucide-react";
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

//schema
import { CreateTransactionSchema } from "@/schemas";

//props
import { CardCategory } from "@/components/shared/card/card-category";
import { SelectCategory } from "@/components/shared/select/select-category";

//actions
import { createTransaction, updateTransaction } from "@/hooks/internal/company/use-transaction";
import { Textarea } from "@/components/ui/textarea";
import { useTransactionCategories } from "@/hooks/internal/company/category/use-tc";
import { DatePickerField } from "@/components/shared/select/date-picker-field";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { useCompany, usePatient } from "@/context/context";
import { TransactionFormData } from "@/types/transaction";

interface CreateTransactionFormProps {
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
  transactionData?: TransactionFormData;
}

export const CreateTransactionForm = ({
  setOpen,
  onSuccess,
  transactionData
}: CreateTransactionFormProps) => {
  const { companyId } = useCompany();
  const { patientId } = usePatient();
  const { categories, isLoading } = useTransactionCategories(companyId);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateTransactionSchema>>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: transactionData ?? {
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
    startTransition(async () => {
      let data;

      if (transactionData?.id) {
        data = await updateTransaction(values, companyId, patientId, transactionData.id);
      } else {
        data = await createTransaction(values, companyId, patientId);
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
      <form onSubmit={form.handleSubmit(OnSubmit)}>
        <CardCategory
          icon={<Notebook />}
          title="รายการธุรกรรม"
          description="รายละเอียดธุรกรรม / ข้อมูลธุรกรรม"
        >
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
          <SubmitButton
            label={transactionData?.id ? "อัพเดตข้อมูล" : "เพิ่มรายการใหม่"}
            type="submit"
            isPending={isPending}
          />
        </div>
      </form>
    </Form>
  );
};
