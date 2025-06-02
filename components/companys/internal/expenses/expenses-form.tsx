"use client";

import * as z from "zod";

//react
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

//icons
import {
  HandCoins,
  CreditCard,
  Banknote,
  QrCode,
  Smartphone,
  Wallet,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//schema
import { CreateExpensesSchema } from "@/schemas";

//props
import { CardCategory } from "@/components/shared/card";
import { SelectCategory } from "@/components/shared/select/select-category";

//actions
import {
  createExpenses,
  useExpensesCategories,
} from "@/hooks";
import { DatePickerField } from "@/components/shared/select/date-picker-field";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { useCompany } from "@/context/context";

interface CreateExpensesFormProps {
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export const CreateExpensesForm = ({
  setOpen,
  onSuccess,
}: CreateExpensesFormProps) => {
  const { companyId } = useCompany();
  const { categories, isLoading } = useExpensesCategories(companyId);

  const [isPending, startTransition] = useTransition();

  const paymentOptions = [
    { id: "เงินสด", icon: <Banknote className="size-4" /> },
    { id: "โอนเงินธนาคาร", icon: <QrCode className="size-4" /> },
    { id: "พร้อมเพย์", icon: <Smartphone className="size-4" /> },
    { id: "บัตรเครดิต", icon: <CreditCard className="size-4" /> },
    { id: "บัตรเดบิต", icon: <HandCoins className="size-4" /> },
  ];

  const form = useForm<z.infer<typeof CreateExpensesSchema>>({
    resolver: zodResolver(CreateExpensesSchema),
    defaultValues: {
      datetime: new Date(),
      name: "",
      ecId: "",
      payment: "",
      amount: 0,
    },
  });

  const OnSubmit = (values: z.infer<typeof CreateExpensesSchema>) => {
    startTransition(async () => {
      const data = await createExpenses(values, companyId);

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
          icon={<Wallet />}
          title="รายการรายจ่าย"
          description="เพิ่มรายการธุรกรรม / รายการรายจ่าย"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DatePickerField
              form={form}
              name="datetime"
              withQuickSelect={false}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">รายการ</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="John Doe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ecId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    หมวดหมู่
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

            <FormField
              control={form.control}
              name="payment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    ช่องทางชำระ
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isPending}
                      >
                        <SelectTrigger className="w-[180px]">
                          <div className="flex items-center gap-2">
                            <SelectValue placeholder="เลือกช่องทางชำระ" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {paymentOptions.map((payment) => (
                            <SelectItem key={payment.id} value={payment.id}>
                              <div className="flex items-center gap-2">
                                {payment.icon}
                                {payment.id}
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

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    จำนวนเงิน
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
            label="เพิ่มรายการ"
            type="submit"
            isPending={isPending}
          />
        </div>
      </form>
    </Form>
  );
};
