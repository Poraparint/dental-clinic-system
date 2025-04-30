"use client";

import * as z from "zod";

//params
import { useParams } from "next/navigation";

//react
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, addDays } from "date-fns";

//icons
import {
  Circle,
  CalendarIcon,
  HandCoins,
  CreditCard,
  Banknote,
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

//schema
import { CreateExpensesSchema } from "@/schemas";

//props
import { CardCategory } from "@/components/props/card-category";
import { SelectCategory } from "@/components/props/select-category";

//actions
import { createExpenses } from "@/actions/company/manager/expenses";
import { useExpensesCategories } from "@/hooks/internal/use-ec";

interface CreateTransactionFormProps {
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export const CreateExpensesForm = ({
  setOpen,
  onSuccess,
}: CreateTransactionFormProps) => {
  const params = useParams();
  const companyId = params.companyId as string;
  const { categories, isLoading } = useExpensesCategories(companyId);

  const [isPending, startTransition] = useTransition();

  const paymentOptions = [
    { id: "เงินสด", icon: <Banknote className="w-4 h-4" /> },
    { id: "บัตรเครดิต", icon: <CreditCard className="w-4 h-4" /> },
    { id: "บัตรเดบิต", icon: <HandCoins className="w-4 h-4" /> },
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
    startTransition(() => {
      createExpenses(values, companyId)
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
            <FormField
              control={form.control}
              name="datetime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    เลือกวันที่
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>เลือกวันที่</span>
                          )}
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent
                        align="start"
                        className="flex w-auto flex-col space-y-2 p-2 bg-background z-[1000]"
                      >
                        <Select
                          onValueChange={(value) =>
                            field.onChange(addDays(new Date(), parseInt(value)))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกรายการ" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="0">วันนี้</SelectItem>
                            <SelectItem value="1">พรุ่งนี้</SelectItem>
                            <SelectItem value="3">อีก 3 วัน</SelectItem>
                            <SelectItem value="7">อีก 1 สัปดาห์</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="rounded-md border">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
        <Button
          className="flex justify-self-end px-9"
          typeof="submit"
          size="lg"
          disabled={isPending}
        >
          เพิ่มรายการใหม่
        </Button>
      </form>
    </Form>
  );
};
